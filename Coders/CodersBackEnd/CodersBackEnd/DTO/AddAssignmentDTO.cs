namespace CodersBackEnd.DTO
{
    public class AddAssignmentDTO
    {
        public string? AssignmentTitle { get; set; }

        public IFormFile? AssignmentName { get; set; }

        public int? ProgramId { get; set; }

        public DateTime? DeadTime { get; set; }

        public string? Description { get; set; }

    }
}
