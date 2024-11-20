using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Tsp;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly MyDbContext _db;

        public AssignmentController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetAssignments/{programId}")]
        public IActionResult GetAssignments(int programId) {

            var assigments = _db.Assignments.ToList();

            if (programId == 0)
            {
                assigments = _db.Assignments.ToList();
            }
            else {
                assigments = _db.Assignments.Where(a => a.ProgramId == programId).ToList();

            }

            return Ok(assigments);
        }

        [HttpGet("GetAssignmentsForStudent/{studentId}")]
        public IActionResult GetAssignmentsForStudent(int studentId)
        {
            try
            {
                var student = _db.Students.Find(studentId);

                var assigments = _db.Assignments.Where(a => a.ProgramId == student.ProgramId).ToList();



                return Ok(assigments);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
           
        }

        [HttpGet("GetAssignmentsDetails/{assignmentId}")]
        public IActionResult GetAssignmentsDetails(int assignmentId)
        {

            var assigmentDetails = _db.Assignments.Include(p => p.Program).Where(a => a.AssignmentId == assignmentId).FirstOrDefault(); 

            return Ok(assigmentDetails);
        }

        [HttpPost("AddAssignmentByAdmin")]
        public IActionResult AddAssignmentByAdmin([FromForm] AddAssignmentDTO addAss)
        {
            if (addAss.AssignmentName != null && addAss.AssignmentName.Length > 0)
            {
                var myFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Plans";
                var assignmentPath = Path.Combine(myFolder, addAss.AssignmentName.FileName);

                if (!System.IO.File.Exists(assignmentPath))
                {

                    using (var stream = new FileStream(assignmentPath, FileMode.Create))
                    {
                        addAss.AssignmentName.CopyTo(stream);
                    }

                }

            }
            else
            {
                return BadRequest("AssignmentName is required.");
            }

            Assignment newAssignment = new Assignment()
            {
                AssignmentTitle = addAss.AssignmentTitle,
                AssignmentName = addAss.AssignmentName.FileName,
                ProgramId = addAss.ProgramId,
                DeadTime = addAss.DeadTime,
                Description = addAss.Description,
            };

            _db.Assignments.Add(newAssignment);
            _db.SaveChanges();

            return Ok("Assignment added successfully.");
        }

        [HttpDelete("DeleteAssignment/{id}")]
        public IActionResult DeleteAssignment(int id) {

            var findAssignment = _db.Assignments.Find(id);

            _db.Assignments.Remove(findAssignment);
            _db.SaveChanges();

            return Ok("Assignment was deleted successfully!");
        }


        [HttpPost("AddAssignmentByStudent")]
        public IActionResult AddAssignmentByStudent([FromBody] AddAssignmentFromStudentDTO solution )
        {


            AssignmentSubmition StudentSolution = new AssignmentSubmition()
            {
                AssignmentId = solution.AssignmentId,
                StudentId = solution.StudentId,
                ProgramId = solution.ProgramId,
                Solution = solution.Solution,
                DateOfSubmition = DateTime.Now,
            };

            _db.AssignmentSubmitions.Add(StudentSolution);
            _db.SaveChanges();

            return Ok("Solution added successfully.");
        }


        [HttpPut("AddFeedback")]
        public IActionResult AddFeedback([FromBody] AddAssignmentFromStudentDTO feedback)
        {

            var solution = _db.AssignmentSubmitions.Where(s => s.StudentId == feedback.StudentId && s.AssignmentId == feedback.AssignmentId).FirstOrDefault();

            if (solution == null) { 
                return NotFound();
            }
            solution.Feedback = feedback.Feedback;

            _db.AssignmentSubmitions.Update(solution);
            _db.SaveChanges();

            return Ok("Feedback added successfully.");
        }


        [HttpGet("GetSolutionByStudentId/{studentId}/{assignmentId}")]
        public IActionResult GetSolutionByStudentId(int studentId, int assignmentId)
        {
           var allSolutions = _db.AssignmentSubmitions.Where(a => a.StudentId == studentId && a.AssignmentId == assignmentId).ToList();

            return Ok(allSolutions);
        }

    }
}
