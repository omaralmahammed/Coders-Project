using Coders.DTO;
using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private readonly MyDbContext _db;

        public StudentController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetFirstFourStudents")]
        public IActionResult GetFirstFourStudents() {

            var students = _db.Students.Include(u => u.User).Take(4).ToList();


            return Ok(students);
        }

        [HttpGet("GetStudents/{programId}")]
        public IActionResult GetStudents(int programId)
        {

            var students = _db.Students.Include(u => u.User).ToList();

            if (programId == 0)
            {
                 students = _db.Students.Include(u => u.User).ToList();

            }
            else
            {
                 students = _db.Students.Include(u => u.User).Where(p => p.ProgramId == programId).ToList();
            }

            return Ok(students);

        }

        [HttpGet("GetStudentDetails/{studentId}")]
        public IActionResult GetStudentDetails(int studentId)
        {

            var studentDetails = _db.Students.Include(u => u.User).Include(p => p.Program).Where(s => s.StudentId == studentId).FirstOrDefault();

            return Ok(studentDetails);
        }

        [HttpPut("UpdateStudentDetails/{studentId}")]
        public IActionResult UpdateStudentDetails([FromForm] StudentRequestDTO editUser, int studentId)
        {
            var student = _db.Students.Find(studentId);
            var user = _db.Users.Find(student.UserId);

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

            student.ProgramId = editUser.ProgramId ?? student.ProgramId;




            _db.Users.Update(user);
            _db.Students.Update(student);
            _db.SaveChanges();

            return Ok();

        }

        [HttpDelete("deleteStudent/{studentId}")]
        public IActionResult deleteStudent(int studentId)
        {

            var student = _db.Students.Find(studentId);
          
            _db.Students.Remove(student);
            _db.SaveChanges();

            return Ok();
        }

        [HttpGet("GetStudentDetailsByUserId/{userId}")]
        public IActionResult GetStudentDetailsByUserId(int userId)
        {

            var studentDetails = _db.Students.Include(u => u.User).Include(p => p.Program).Where(s => s.UserId == userId).FirstOrDefault();

            if (studentDetails == null)
            {
                return BadRequest("Studednt don't have any program");
            }

            return Ok(studentDetails);
        }



        [HttpGet("AssignmentStudents/{assignmentId}/{programId}")]
        public async Task<IActionResult> GetStudentsAssignmentStatus(int assignmentId, int programId)
        {
            var allStudents = await _db.Students.Include(s => s.User).Where(p => p.ProgramId == programId).ToListAsync();

            var studentsWithSubmissions = await _db.AssignmentSubmitions
                                                         .Where(sub => sub.AssignmentId == assignmentId)
                                                         .Include(sub => sub.Student)
                                                         .ThenInclude(s => s.User)
                                                         .ToListAsync();

            var groupedSubmissions = studentsWithSubmissions
                                      .GroupBy(sub => sub.StudentId)
                                      .Select(g => g.OrderByDescending(sub => sub.DateOfSubmition).First()) 
                                      .ToList();

            var studentsWhoUploaded = groupedSubmissions.Select(sub => sub.StudentId).ToList();

            var studentsWhoDidNotUpload = allStudents.Where(s => !studentsWhoUploaded.Contains(s.StudentId)).ToList();

            var result = new
            {
                Uploaded = groupedSubmissions.Select(sub => new {
                    sub.Student.StudentId,
                    sub.Student.User.FirstName,
                    sub.Student.User.LastName,
                    sub.AssignmentId,
                    sub.AssignmentSubmitionId
                }),
                NotUploaded = studentsWhoDidNotUpload.Select(s => new {
                    s.StudentId,
                    s.User.FirstName,
                    s.User.LastName,
                })
            };

            return Ok(result);
        }


    }
}
