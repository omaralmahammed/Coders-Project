using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System;
using System.Linq;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramController : ControllerBase
    {


        private readonly MyDbContext _db;

        public ProgramController(MyDbContext db)
        {
            _db = db;
        }



        [HttpGet("GetFirstThreePrograms")]
        public IActionResult GetFirstThreePrograms()
        {
            var programs = _db.Programs.Include(p => p.Instructors).Take(3);

            return Ok(programs);
        }

        [HttpGet("GetPrograms/{category}")]
        public IActionResult GetPrograms(string category)
        {
            try
            {
                var programs = _db.Programs.Include(p => p.Instructors).ToList();



                if (category == "All")
                {
                    programs = _db.Programs.Include(p => p.Instructors).ToList();

                }
                else
                {
                    programs = _db.Programs.Where(p => p.Category == category).ToList();
                }

                return Ok(programs);


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetProgramById/{programId}")]
        public IActionResult GetProgramById(int programId)
        {
            var programs = _db.Programs.Include(p => p.Instructors).Where(p => p.ProgramId == programId).FirstOrDefault();

            return Ok(programs);
        }

        [HttpPost("AddProgram")]
        public IActionResult AddProgram([FromForm] AddProgramRequestDTO addProgram)
        {

            var checkProgram = _db.Programs.Where(n => n.Name == addProgram.Name).FirstOrDefault();

            if (checkProgram != null) {
                return BadRequest("The program is already Existed.");
            }

            if (addProgram.Image != null && addProgram.Image.Length > 0)
            {
                var myFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Images";

                var imagePath = Path.Combine(myFolder, addProgram.Image.FileName);

                if (!System.IO.File.Exists(imagePath))
                {
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        addProgram.Image.CopyTo(stream);
                    }
                }

            }

            CodersBackEnd.Models.Program newProgram = new CodersBackEnd.Models.Program()
           {
                Name = addProgram.Name,
                Title = addProgram.Title,
                Price = addProgram.Price,
                Image = addProgram.Image.FileName,
                PeriodTime = addProgram.PeriodTime,
                Category = addProgram.Category,
                Description1 = addProgram.Description1,
                Description2 = addProgram.Description2,
                Curriculum = addProgram.Curriculum.FileName,
                DateOfStart = addProgram.DateOfStart
            };

            _db.Programs.Add(newProgram);
            _db.SaveChanges();

            return Ok();
        }

        [HttpPut("UpdateProgram/{programId}")]
        public IActionResult UpdateProgram([FromForm] AddProgramRequestDTO updateProgram, int programId)
        {
            var program = _db.Programs.Find(programId);

            if (updateProgram.Image != null && updateProgram.Image.Length > 0)
            {
                var myFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Images";

                var imagePath = Path.Combine(myFolder, updateProgram.Image.FileName);

                if (!System.IO.File.Exists(imagePath))
                {
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        updateProgram.Image.CopyTo(stream);
                    }
                }

                program.Image = updateProgram.Image.FileName ?? program.Image;
            }

            if (updateProgram.Curriculum != null && updateProgram.Curriculum.Length > 0)
            {
                var myFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Plans";

                var planPath = Path.Combine(myFolder, updateProgram.Curriculum.FileName);

                if (!System.IO.File.Exists(planPath))
                {
                    using (var stream = new FileStream(planPath, FileMode.Create))
                    {
                        updateProgram.Curriculum.CopyTo(stream);
                    }
                }

                program.Curriculum = updateProgram.Curriculum.FileName ?? program.Curriculum;
            }

            program.Name = updateProgram.Name?? program.Name;
            program.Title = updateProgram.Title ?? program.Title;
            program.Price = updateProgram.Price ?? program.Price;
            program.Category = updateProgram.Category ?? program.Category;
            program.PeriodTime = updateProgram.PeriodTime ?? program.PeriodTime;
            program.Description1 = updateProgram.Description1 ?? program.Description1;
            program.Description2 = updateProgram.Description2 ?? program.Description2;
            program.DateOfStart = updateProgram.DateOfStart ?? program.DateOfStart;


            _db.Programs.Update(program);
            _db.SaveChanges();

            return Ok(program);

        }


        [HttpDelete("DeleteProgram/{programId}")]
        public IActionResult DeleteProgram(int programId)
        {
            var program = _db.Programs.Find(programId);

            if (program == null)
            {
                return NotFound(new { message = "Instructor not found" });
            }

            _db.Programs.Remove(program);
            _db.SaveChangesAsync();

            return Ok();
        }
    }
}
