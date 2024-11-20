using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {

        private readonly MyDbContext _db;


        public MaterialController(MyDbContext db)
        {
            _db = db;        
        }


        [HttpGet("GetTechnology/{studentId}/{programId}")]
        public IActionResult GetTechnology(int studentId,int programId) {

            var technologist = _db.Technologies.Include(p => p.Program).Where(t => t.ProgramId == programId).ToList();


            if (programId == 0) { 
            var student = _db.Students.Find(studentId);

             technologist = _db.Technologies.Include(p => p.Program).Where(t => t.ProgramId == student.ProgramId).ToList();
            }
           

            return Ok(technologist);
        }

        [HttpPost("AddTechnology")]
        public IActionResult AddTechnology([FromBody] TechnologyRequestDTO technologyInfo)
        {
            Technology newTechnology = new Technology()
            {
                TechnologyName = technologyInfo.TechnologyName,
                ProgramId = technologyInfo.ProgramId,
            };

            _db.Technologies.Add(newTechnology);
            _db.SaveChanges();

            return Ok(newTechnology);
        }


        [HttpDelete("DeleteTechnology/{technologyId}")]
        public IActionResult DeleteTechnology(int technologyId)
        {
            var technologist = _db.Technologies.Find(technologyId);

            _db.Technologies.Remove(technologist);
            _db.SaveChanges();

            return Ok();
        }

        /// 
        /// //////////////////////////////////////////////////////////////////////////////////////////////
        ///
       

        [HttpGet("GetSubjects/{technologyId}")]
        public IActionResult GetSubjects(int technologyId)
        {

            var subjects = _db.Subjects.Include(t => t.Technology).Where(t => t.TechnologyId == technologyId).ToList();

            return Ok(subjects);
        }

        [HttpPost("AddSubject")]
        public IActionResult AddSubject([FromBody] SubjectRequestDTO subjectInfo)
        {
            Subject newSubject = new Subject()
            {
                SubjectName = subjectInfo.SubjectName,
                TechnologyId = subjectInfo.TechnologyId,
            };

            _db.Subjects.Add(newSubject);
            _db.SaveChanges();

            return Ok(newSubject);
        }


        [HttpDelete("DeleteSubject/{SubjectId}")]
        public IActionResult DeleteSubject(int SubjectId)
        {
            var Subject = _db.Subjects.Find(SubjectId);

            _db.Subjects.Remove(Subject);
            _db.SaveChanges();

            return Ok();
        }

        /// 
        /// //////////////////////////////////////////////////////////////////////////////////////////////
        ///

        [HttpGet("GetAllContent")]
        public IActionResult GetAllContent()
        {

            var allContents = _db.Contents.ToList();

            return Ok(allContents);
        }

        [HttpGet("GetContent/{subjectId}")]
        public IActionResult GetContent(int subjectId)
        {

            var contents = _db.Contents.Include(p => p.Subject).Where(t => t.SubjectId == subjectId).ToList();

            return Ok(contents);
        }


        [HttpPost("AddContent/{type}")]
        public IActionResult AddContentText([FromBody] ContentRequestDTO contentInfo, string type)
        {
            Content newContent = new Content()
            {
                ContentDetails = contentInfo.ContentDetails,
                ContentTypes = type,
                SubjectId = contentInfo.SubjectId,
            };

            _db.Contents.Add(newContent);
            _db.SaveChanges();

            return Ok(newContent);
        }



        [HttpDelete("DeleteContent/{contentId}")]
        public IActionResult DeleteContent(int contentId)
        {
            var content = _db.Contents.Find(contentId);

            _db.Contents.Remove(content);
            _db.SaveChanges();

            return Ok();
        }


    }
}
