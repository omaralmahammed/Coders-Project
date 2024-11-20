using Coders.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Net.WebRequestMethods;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _db;

        public UserController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("AllUsers")]
        public IActionResult AllUsers()
        {
            var users = _db.Users.ToList();

            return Ok(users);
        }

        [HttpGet("UserDetails/{userId}")]
        public IActionResult UserDetails(int userId)
        { 
            var user = _db.Users.Find(userId);

            return Ok(user);
        }

        [HttpPut("UpdateUserDetails/{userId}")]
        public IActionResult UpdateUserDetails([FromForm] UserInformationRequestDTO editUser, int userId)
        {
            var user = _db.Users.Find(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (editUser.Image != null && editUser.Image.Length > 0)
            {
                var myFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Images";

                var imagePath = Path.Combine(myFolder, editUser.Image.FileName);

                if (!System.IO.File.Exists(imagePath))
                {
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        editUser.Image.CopyTo(stream);
                    }
                }

                user.Image = editUser.Image.FileName ?? user.Image;
            }



            user.FirstName = editUser.FirstName ?? user.FirstName;
            user.LastName = editUser.LastName ?? user.LastName;
            user.Email = editUser.Email ?? user.Email;
            user.Gender = editUser.Gender ?? user.Gender;
            user.DateOfBirth = editUser.DateOfBirth ?? user.DateOfBirth;
            user.Country = editUser.Country ?? user.Country;
            user.City = editUser.City ?? user.City;
            user.Postcode = editUser.Postcode ?? user.Postcode;
            user.PhoneNumber = editUser.PhoneNumber ?? user.PhoneNumber;


            if (!string.IsNullOrEmpty(editUser.Password))
            {

                byte[] passwordHash, passwordSalt;
                PasswordHashDTO.CreatePasswordHash(editUser.Password, out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Password = editUser.Password;
            }

            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok(user);
        }


        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromForm] UserInformationRequestDTO userInfo)
        {
            var checkEmail = _db.Users.Where(e => e.Email == userInfo.Email).FirstOrDefault();

            if (checkEmail != null)
            {
                return BadRequest("Email is elready excest.");
            }


            byte[] passwordHash, passwordSalt;
            PasswordHashDTO.CreatePasswordHash(userInfo.Password, out passwordHash, out passwordSalt);

            User addUser = new User
            {
                FirstName = userInfo.FirstName,
                LastName = userInfo.LastName,

                Email = userInfo.Email,

                Password = userInfo.Password,

                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,

                Image = "default.jpg"
            };

            _db.Users.Add(addUser);
            _db.SaveChanges();


            string subjectText = "Welcome You";
            string messageText = $@"
                                <html>
                                <head>
                                    <style>
                                        body {{
                                            font-family: Arial, sans-serif;
                                            background-color: #f9f9f9;
                                            color: #333;
                                            line-height: 1.6;
                                            margin: 0;
                                            padding: 0;
                                        }}
                                        .email-container {{
                                            max-width: 600px;
                                            margin: 20px auto;
                                            background: #ffffff;
                                            border: 1px solid #ddd;
                                            border-radius: 8px;
                                            padding: 20px;
                                            text-align: center;
                                        }}
                                        .header h2 {{
                                            color: #4CAF50;
                                        }}
                                        .btn {{
                                            display: inline-block;
                                            padding: 10px 20px;
                                            margin-top: 20px;
                                            background-color: #4CAF50;
                                            color: white;
                                            text-decoration: none;
                                            border-radius: 4px;
                                            font-weight: bold;
                                        }}
                                        .btn:hover {{
                                            background-color: #45a049;
                                        }}
                                    </style>
                                </head>
                                <body>
                                    <div class='email-container'>
                                        <div class='header'>
                                            <h2>Welcome to Coders!</h2>
                                        </div>
                                        <p>Dear {userInfo.FirstName} {userInfo.LastName},</p>
                                        <p>Thank you for joining Coders! Explore our resources and get ready to kickstart your programming journey.</p></br>
                                        <p>Best regards,<br>The Coders Team</p>
                                    </div>
                                </body>
                                </html>";



            await Helpers.Helper.SendEmail(subjectText, messageText, userInfo.Email);


            return Ok();
        }


        [HttpPost("Login")]
        public IActionResult Login([FromForm] UserInformationRequestDTO userInfo)
        {
            var user = _db.Users.FirstOrDefault(e => e.Email == userInfo.Email);

            if (user == null || !PasswordHashDTO.VerifyPasswordHash(userInfo.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token, UserId = user.UserId });
        }




        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecureLongKeyForJWT12345"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourapp.com",
                audience: "yourapp.com",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);


            _db.SaveChanges();
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var user = _db.Users.FirstOrDefault(u => u.Email == email);

            if (user != null)
            {
        
                Random rand = new Random();
                string otp = rand.Next(100000, 1000000).ToString();

                string subjectText = "Your OTP Code";
                string messageText = $@"
                                    <html>
                                    <head>
                                        <style>
                                            body {{
                                                font-family: Arial, sans-serif;
                                                background-color: #f9f9f9;
                                                color: #333;
                                                line-height: 1.6;
                                                margin: 0;
                                                padding: 0;
                                            }}
                                            .email-container {{
                                                max-width: 600px;
                                                margin: 20px auto;
                                                background: #ffffff;
                                                border: 1px solid #ddd;
                                                border-radius: 8px;
                                                padding: 20px;
                                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                            }}
                                            .header {{
                                                text-align: center;
                                                margin-bottom: 20px;
                                            }}
                                            .header h2 {{
                                                color: #4CAF50;
                                            }}
                                            .content {{
                                                text-align: left;
                                            }}
                                            .content p {{
                                                margin: 10px 0;
                                            }}
                                            .otp-code {{
                                                font-size: 24px;
                                                color: #4CAF50;
                                                font-weight: bold;
                                                text-align: center;
                                                margin: 20px 0;
                                            }}
                                            .footer {{
                                                margin-top: 20px;
                                                text-align: center;
                                                font-size: 12px;
                                                color: #777;
                                            }}
                                        </style>
                                    </head>
                                    <body>
                                        <div class='email-container'>
                                            <div class='header'>
                                                <h2>Hello {user.FirstName} {user.LastName}</h2>
                                            </div>
                                            <div class='content'>
                                                <p><strong>Your OTP code is:</strong></p>
                                                <p class='otp-code'>{otp}</p>
                                                <p>If you have any questions or need additional assistance, please feel free to contact our support team.</p>
                                            </div>
                                            <div>
                                                <p>Best wishes,<br>Coders Support Team</p>
                                            </div>
                                        </div>
                                    </body>
                                    </html>";

                try
                {


                   await Helpers.Helper.SendEmail(subjectText, messageText, user.Email);


                    user.Otp = otp;

                    _db.Update(user);
                    _db.SaveChanges();
                    return Ok(new { otp, user.UserId });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { Message = "Failed to send email. Please try again later.", Error = ex.Message });
                }
            }
            else
            {
                return NotFound(new { Message = "Email not found." });
            }

        }


        [HttpPut("ChangePassowrd")]
        public IActionResult ChangePassowrd([FromForm] UserInformationRequestDTO newPassowrd)
        {
            var user = _db.Users.FirstOrDefault(e => e.Email == newPassowrd.Email);

            if (user.Otp != newPassowrd.Otp)
            {
                return BadRequest("Invalid OTP");
            }

            byte[] passwordHash, passwordSalt;
            PasswordHashDTO.CreatePasswordHash(newPassowrd.Password, out passwordHash, out passwordSalt);

            user.Password = newPassowrd.Password;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok();
        }


    
    }
}
