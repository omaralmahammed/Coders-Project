using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly MyDbContext _db;

        // Inject the DbContext
        public ServicesController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("AllServices")]
        public IActionResult AllServices()
        {
            var services = _db.Services.ToList();

            return Ok(services);
        }

        [HttpGet("FirstFourServices")]
        public IActionResult FirstFourServices()
        {
            var services = _db.Services.Take(4);

            return Ok(services);
        }

        [HttpGet("ServicesById/{serviceId}")]
        public IActionResult ServicesById(int serviceId)
        {
            var service = _db.Services.Where(s => s.ServiceId == serviceId).FirstOrDefault();

            return Ok(service);
        }


        [HttpPut("UpdateService/{serviceId}")]
        public IActionResult UpdateService([FromForm] ServiceRequestDTO serviceInfo, int serviceId)
        {
            var service = _db.Services.Where(s => s.ServiceId == serviceId).FirstOrDefault();

            service.Name = serviceInfo.Name ?? service.Name;
            service.Brief = serviceInfo.Brief ?? serviceInfo.Brief;
            service.Description = serviceInfo.Description ?? serviceInfo.Description;

            _db.Services.Update(service);
            _db.SaveChanges();

            return Ok(service);
        }




        [HttpPost("AddService")]
        public IActionResult AddService([FromForm] ServiceRequestDTO serviceInfo)
        {

            Service newService = new Service()
            {
                Name = serviceInfo.Name,
                Brief = serviceInfo.Brief,
                Description = serviceInfo.Description,
            };

            _db.Services.Add(newService);
            _db.SaveChanges();

            return Ok();
        }

        [HttpDelete("DeleteService/{ServiceId}")]

        public IActionResult DeleteService(int ServiceId)
        {

            var service = _db.Services.Find(ServiceId);

            _db.Services.Remove(service);
            _db.SaveChanges();

            return Ok();
        }

    }
}
