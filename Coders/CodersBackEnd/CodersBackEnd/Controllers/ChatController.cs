using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ChatController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetWhomItIsSent/{id}/{type}")]

        public IActionResult GetWhomItIsSent(int id, string type) {

            try
            {
                if (type == "students")
                {

                    var student = _db.Students.Find(id);

                    var instructers = _db.Instructors.Where(i => i.ProgramId == student.ProgramId).ToList();

                    if (instructers == null)
                    {
                        return NotFound();
                    }

                    return Ok(instructers); 
                }
                else if (type == "instructor")
                {
                    var instructor = _db.Instructors.Find(id);

                    var students = _db.Students.Include(u => u.User).Where(s => s.ProgramId == instructor.ProgramId).ToList();


                    if (students == null)
                    {
                        return NotFound();
                    }

                    return Ok(students);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost("CreateRoom/{studentId}/{instructerId}")]
        public async Task<IActionResult> CreateRoom(int studentId, int instructerId)
        {
            try
            {
                var room = _db.ChatRooms.Where(r => r.StudentdId == studentId && r.InstructorId == instructerId).FirstOrDefault();

                if (room == null)
                {
                    ChatRoom newRoom = new ChatRoom()
                    {
                        StudentdId = studentId,
                        InstructorId = instructerId,
                        NotificationNumber = 0,
                    };

                    _db.ChatRooms.Add(newRoom);
                    await _db.SaveChangesAsync();

                    return Ok(newRoom);
                }
                else
                {
                    room.NotificationNumber = 0;
                    _db.ChatRooms.Update(room);
                    await _db.SaveChangesAsync();

                }


                return Ok("The Room is exist");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpGet("GetMessages/{studentId}/{instructorId}")]
        public IActionResult GetMessages(int studentId, int instructorId)
        {
            try
            {
                var room = _db.ChatRooms
                    .FirstOrDefault(r => r.StudentdId == studentId && r.InstructorId == instructorId);

                if (room == null)
                {
                    return NotFound("Chat room not found for the given student and instructor.");
                }

                var result = (from message in _db.ChatMessages
                              where message.ChatRoomId == room.ChatRoomId
                              join student in _db.Students on room.StudentdId equals student.StudentId
                              join user in _db.Users on student.UserId equals user.UserId
                              join instructor in _db.Instructors on room.InstructorId equals instructor.InstructorId
                              select new
                              {
                                  Message = message,
                                  Instructor = new
                                  {
                                      Id = instructor.InstructorId,
                                      Name = instructor.FirstName + " " + instructor.SecondName,
                                      Image = instructor.Image
                                  },
                                  Student = new
                                  {
                                      Name = user.FirstName + " " + user.LastName,
                                      Image = user.Image
                                  }
                              }).ToList();

                if (result.Count == 0)
                {
                    return Ok("There are no messages.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        [HttpPost("AddMessage/{studentId}/{instructorId}")]
        public async Task<IActionResult> AddMessage(int studentId, int instructorId, [FromBody] ChatMessageDTO message)
        {
            
            try
            {
                var room = _db.ChatRooms.FirstOrDefault(r => r.StudentdId == studentId && r.InstructorId == instructorId);

                room.NotificationNumber = +1;
                _db.ChatRooms.Update(room);


                ChatMessage newMessage = new ChatMessage
                {
                    ChatRoomId = room.ChatRoomId,
                    MessageText = message.MessageText,
                    SenderType = message.SenderType,
                    Status = "unread",
                };

                _db.ChatMessages.Add(newMessage);

                await _db.SaveChangesAsync();

                return Ok(newMessage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("GetNotificationNumber/{studentId}/{instructorId}")]

        public IActionResult GetNotificationNumber(int studentId, int instructorId)
        {
            var room = _db.ChatRooms
               .FirstOrDefault(r => r.StudentdId == studentId && r.InstructorId == instructorId);


            if (room == null)
            {
                return NotFound();
            }

            return Ok(new { privateMessageNumber = room.NotificationNumber });
        }
    }
}
