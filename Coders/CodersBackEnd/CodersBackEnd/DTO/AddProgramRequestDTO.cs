namespace CodersBackEnd.DTO
{
    public class AddProgramRequestDTO
    {

        public string? Name { get; set; }

        public string? Title { get; set; }

        public string? Price { get; set; }

        public IFormFile? Image { get; set; }

        public string? Category { get; set; }

        public string? PeriodTime { get; set; }

        public string? Description1 { get; set; }

        public string? Description2 { get; set; }

        public IFormFile? Curriculum { get; set; }

        public DateTime? DateOfStart { get; set; }
    }
}
