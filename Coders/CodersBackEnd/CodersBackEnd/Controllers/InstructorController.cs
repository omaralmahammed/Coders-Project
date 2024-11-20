using Coders.DTO;
using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController : ControllerBase
    {

        private readonly MyDbContext _db;

        public InstructorController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllInstructers")]
        public IActionResult GetAllInstructers()
        {
            var instructors = _db.Instructors.ToList();

            return Ok(instructors);
        }


        [HttpGet("GetFirstFourInstructer")]
        public IActionResult GetFirstFourInstructer()
        {
            var instructors = _db.Instructors.Take(4);

            return Ok(instructors);
        }


        [HttpGet("GetInstructerDeetails/{instructerId}")]
        public IActionResult GetInstructerDeetails(int instructerId)
        {
            var instructorDetails = _db.Instructors.Where(i => i.InstructorId == instructerId).FirstOrDefault();

            return Ok(instructorDetails);
        }


        [HttpGet("GetInstructerDeetailsAdmin/{instructerId}")]
        public IActionResult GetInstructerDeetailsAdmin(int instructerId)
        {
            var instructerDetails = (from instructor in _db.Instructors
                                     join program in _db.Programs
                                     on instructor.ProgramId equals program.ProgramId
                                     where instructor.InstructorId == instructerId
                                     select new
                                     {
                                         instructor.InstructorId,
                                         instructor.FirstName,
                                         instructor.SecondName,
                                         instructor.Email,
                                         instructor.LinkInProfile,
                                         instructor.Image,
                                         instructor.Description,
                                         instructor.Education,
                                         program.ProgramId,
                                         ProgramName = program.Name,
                                         ProgramTitle = program.Title,
                                         ProgramImage = program.Image,

                                     }).FirstOrDefault();

            return Ok(instructerDetails);
        }


        [HttpPut("UpdateInstructerInfo/{instructorId}")]
        public IActionResult UpdateInstructerInfo([FromForm] InstructorInformationRequestDTO newInfo, int instructorId)
        {
            var instructorDetails = _db.Instructors.Find(instructorId);


            if (newInfo.Image != null && newInfo.Image.Length > 0)
            {
                var myFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Images";

                var imagePath = Path.Combine(myFolder, newInfo.Image.FileName);

                if (!System.IO.File.Exists(imagePath))
                {
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        newInfo.Image.CopyTo(stream);
                    }
                }

                instructorDetails.Image = newInfo.Image.FileName ?? instructorDetails.Image;
            }



            instructorDetails.FirstName = newInfo.FirstName ?? instructorDetails.FirstName;
            instructorDetails.SecondName = newInfo.SecondName ?? instructorDetails.SecondName;
            instructorDetails.Email = newInfo.Email ?? instructorDetails.Email;
            instructorDetails.LinkInProfile = newInfo.LinkInProfile ?? instructorDetails.LinkInProfile;
            instructorDetails.Description = newInfo.Description ?? instructorDetails.Description;
            instructorDetails.Education = newInfo.Education ?? instructorDetails.Education;




            if (!string.IsNullOrEmpty(newInfo.Password))
            {

                byte[] passwordHash, passwordSalt;
                PasswordHashDTO.CreatePasswordHash(newInfo.Password, out passwordHash, out passwordSalt);
                instructorDetails.PasswordHash = passwordHash;
                instructorDetails.PasswordSalt = passwordSalt;
                instructorDetails.Password = newInfo.Password;
            }

            _db.Instructors.Update(instructorDetails);
            _db.SaveChanges();


            return Ok();
        }

        [HttpPost("InstructorsLogin")]

        public IActionResult InstructorsLogin([FromForm] InstructorInformationRequestDTO intsructorInfo)
        {
            var admin = _db.Instructors.FirstOrDefault(e => e.Email == intsructorInfo.Email);

            if (admin == null || !PasswordHashDTO.VerifyPasswordHash(intsructorInfo.Password, admin.PasswordHash, admin.PasswordSalt))
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new {instructorId = admin.InstructorId});
        }

        [HttpPost("AddInstructors")]
        public IActionResult AddInstructors([FromForm] InstructorInformationRequestDTO intsructorInfo)
        {
            var checkEmail = _db.Instructors.Where(e => e.Email == intsructorInfo.Email).FirstOrDefault();

            if (checkEmail != null)
            {
                return BadRequest("Email is elready excest.");
            }


            byte[] passwordHash, passwordSalt;
            PasswordHashDTO.CreatePasswordHash(intsructorInfo.Password, out passwordHash, out passwordSalt);

            CodersBackEnd.Models.Instructor addintsructor = new CodersBackEnd.Models.Instructor
            {
                FirstName = intsructorInfo.FirstName,
                SecondName = intsructorInfo.SecondName,

                Email = intsructorInfo.Email,

                LinkInProfile = intsructorInfo.LinkInProfile,

                ProgramId = intsructorInfo.ProgramId,

                Image = "default.jpg",

                Password = intsructorInfo.Password,

                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _db.Instructors.Add(addintsructor);
            _db.SaveChanges();

            return Ok();
        }


        [HttpDelete("RemoveInstructors/{instructorId}")]
        public IActionResult RemoveInstructors(int instructorId)
        {
            var instructor = _db.Instructors.Find(instructorId);

            if (instructor == null)
            {
                return NotFound(new { message = "Instructor not found" });
            }

            _db.Instructors.Remove(instructor);
            _db.SaveChangesAsync();

            return Ok();
        }
    
        
        
        
    
    }
}
