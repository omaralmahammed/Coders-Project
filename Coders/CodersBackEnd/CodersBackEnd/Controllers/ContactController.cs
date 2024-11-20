using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ContactController(MyDbContext db)
        {
            _db = db;
        }



        [HttpPost("ContactRequest")]
        public IActionResult ContactRequest([FromForm] ContactRequestDTO request)
        {

            Contact newRequest = new Contact()
            {
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Subject = request.Subject,
                Message = request.Message,
                RequestDate = DateTime.Now,
                Status = "pending"
            };

            _db.Contacts.Add(newRequest);
            _db.SaveChanges();
            return Ok();
        }
    }
}
