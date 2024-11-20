using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;
using static System.Net.WebRequestMethods;
using Microsoft.EntityFrameworkCore;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IConverter _converter;

        public PaymentController(MyDbContext db, IConverter converter)
        {
            _db = db;
            _converter = converter;

            StripeConfiguration.ApiKey = "sk_test_51Q3FzBRqxwpgnuaX7azGSStPP6UpFrrMOYsg51jX6Tkoj2M4q95UWWxkWvy8DuIdyVcav2EOZxtXf5O5wMhWDxQC003Xx9VDhk";
        }

        [HttpPost("create-checkout-session")]
        public ActionResult CreateCheckoutSession( [FromBody] PaymentRequestDTO paymentRequest)
        {
            try
            {
                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = paymentRequest.ProductName,
                        },
                        UnitAmount = long.Parse(paymentRequest.Amount)
                    },
                    Quantity = 1,
                },
            },
                    Mode = "payment",
                    SuccessUrl = paymentRequest.SuccessUrl,
                    CancelUrl = paymentRequest.CancelUrl,
                };

                var service = new SessionService();
                Session session = service.Create(options);

                return Ok(new { sessionId = session.Id });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }


        [HttpPost("AddPaymentInfo")]
        public IActionResult AddPaymentInfo([FromBody] PaymentRequestDTO paymentRequest)
        {
            var checkStudentPayment = _db.Payments.Where(u => u.UserId == paymentRequest.UserId).FirstOrDefault();

            if (checkStudentPayment != null)
            {
                return BadRequest("student added before!");
            }

            Payment newPayment = new Payment()
            {
                Amount = paymentRequest.Amount,
                PaymentMethod = "Visa",
                PaymentStatus = "Sucsses",
                PaymentDate = DateTime.Now,
                UserId = paymentRequest.UserId,
                ProgramId = paymentRequest.ProgramId
            };

            _db.Payments.Add(newPayment);
            _db.SaveChanges();

            return Ok();
        }


        [HttpGet("GetPaymentInfo/{userId}")]
        public IActionResult GetPaymentInfo(int userId) { 
        
            var userPaymentInfo = _db.Payments.Include(p => p.Program).Where(u => u.UserId == userId).ToList();

            if (userPaymentInfo == null) {
                return BadRequest("User Don't subscribe in any program");
            }
            return Ok(userPaymentInfo);
        }


        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent([FromBody] PaymentRequestDTO paymentRequest)
        {
            var check = _db.Students.Where(s => s.UserId == paymentRequest.UserId).FirstOrDefault();
            
            if(check != null)
            {
                return BadRequest("Student Already Subscribed!");
            }


            Student newStudent = new Student()
            {
                UserId = paymentRequest.UserId,
                ProgramId = paymentRequest.ProgramId
            };

            _db.Students.Add(newStudent);
            _db.SaveChanges();


            // Send Email

            var user = _db.Users.Find(paymentRequest.UserId);
            var program = _db.Programs.Find(paymentRequest.ProgramId);

           
            string subjectText = $@"Welcome to {program.Name} program! Your subscription is Confirmed";
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
                                            line-height: 1.8;
                                        }}
                                        .content p {{
                                            margin: 10px 0;
                                        }}
                                        .footer {{
                                            margin-top: 20px;
                                            text-align: center;
                                            font-size: 12px;
                                            color: #777;
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
                                            <h2>Welcome to Coders, {user.FirstName}!</h2>
                                        </div>
                                        <div class='content'>
                                            <p>Dear {user.FirstName} {user.LastName},</p>
                                            <p><strong>Congratulations! 🎉 You have successfully subscribed to the <i>{program.Name}</i> program.</strong></p>
                                            <p><strong>What’s Next?</strong> Make sure to log in to your dashboard and explore the course materials. You’ll find your daily subjects, tasks, and important announcements there.</p>
                                            <p>If you have any questions or need assistance, feel free to reach out to us at <a href='mailto:support@coders.com'>support@coders.com</a>.</p>
                                            <p>We’re excited to have you with us and wish you a rewarding learning experience!</p>
                                        </div>
                                        <div class='footer'>
                                            <p>Best wishes,<br>The Coders Team</p>
                                            <p>© 2024 Coders. All rights reserved.</p>
                                        </div>
                                    </div>
                                </body>
                                </html>";



            await Helpers.Helper.SendEmail(subjectText, messageText, user.Email);

            return Ok();
        }


        [HttpPut("AddBllingDetails/{userId}")]
        public IActionResult AddBllingDetails([FromForm] BillingRequestDTO updateInfo, int userId)
        {

            var checkIfSubscribedBefore = _db.Payments.Where(u  => u.UserId == userId).FirstOrDefault();

            if (checkIfSubscribedBefore != null) {

                return BadRequest("User Subscribed Before!");
            }


            var studentPymentInfo = _db.BillingDetails.Where(u => u.UserId == userId).FirstOrDefault();

            if (studentPymentInfo != null) { 
                studentPymentInfo.FirstName = updateInfo.FirstName?? studentPymentInfo.FirstName;
                studentPymentInfo.LastName = updateInfo.LastName?? studentPymentInfo.LastName;
                studentPymentInfo.Address = updateInfo.Address ?? studentPymentInfo.Address;
                studentPymentInfo.City = updateInfo.City ?? studentPymentInfo.City;
                studentPymentInfo.County = updateInfo.County ?? studentPymentInfo.County;
                studentPymentInfo.Postcode = updateInfo.Postcode ?? studentPymentInfo.Postcode;

                _db.BillingDetails.Update(studentPymentInfo);

            }
            else
            {
                BillingDetail newBillingDetails = new BillingDetail()
                {
                    UserId = userId,
                    FirstName = updateInfo.FirstName,
                    LastName = updateInfo.LastName,
                    Address = updateInfo.Address,
                    City = updateInfo.City,
                    County = updateInfo.County,
                    Postcode = updateInfo.Postcode,
                };

                _db.BillingDetails.Add(newBillingDetails);
            }

            _db.SaveChanges();
            return Ok();

        }

        [HttpGet("GetBillingDetails/{userId}")]
        public IActionResult GetBillingDetails(int userId) {

            var userBillingDetails = _db.BillingDetails.Where(s => s.UserId == userId).FirstOrDefault();

            return Ok(userBillingDetails); 
                
        }



        [HttpGet("GenerateInvoice/{paymentId}")]
        public IActionResult GenerateInvoice(int paymentId)
        {
            var paymentItems = _db.Payments.Include(u => u.User).Include(p => p.Program).Where(y => y.PaymentId == paymentId).ToList();

            var pdfDocument = new HtmlToPdfDocument
            {
                GlobalSettings = {
                DocumentTitle = $"Invoice for Payment {paymentId}",
                PaperSize = PaperKind.A4,
                Orientation = Orientation.Portrait
        },
                Objects = {
            new ObjectSettings
            {
                HtmlContent = Helpers.Helper.GenerateInvoiceHtml(paymentItems),
                WebSettings = { DefaultEncoding = "utf-8" }
            }
        }
            };

            var pdf = _converter.Convert(pdfDocument);

            return File(pdf, "application/pdf", $"invoice_{paymentId}.pdf");
        }

    }
}

