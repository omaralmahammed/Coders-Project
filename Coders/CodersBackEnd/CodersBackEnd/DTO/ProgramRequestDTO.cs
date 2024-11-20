namespace CodersBackEnd.DTO
{
    public class ProgramRequestDTO
    {
        public int ProgramId { get; set; }

        public string? Name { get; set; }

        public string? Title { get; set; }

        public string? Price { get; set; }

        public IFormFile? Image { get; set; }

        public string? Category { get; set; }

        public string? PeriodTime { get; set; }

        public string? Description1 { get; set; }

        public string? Description2 { get; set; }

        public DateTime? DateOfStart { get; set; }

        public int? InstructorId { get; set; }

        public Instructor Instructor { get; set; }

    }


    public class Instructor
    {
        public int InstructorId { get; set; }

        public string? FirstName { get; set; }

        public string? SecondName { get; set; }

        public string? Image { get; set; }

    }
}
