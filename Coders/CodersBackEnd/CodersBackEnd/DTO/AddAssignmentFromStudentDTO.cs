namespace CodersBackEnd.DTO
{
    public class AddAssignmentFromStudentDTO
    {
        public int? AssignmentId { get; set; }

        public int? StudentId { get; set; }

        public int? ProgramId { get; set; }

        public string? Solution { get; set; }

        public DateTime? DateOfSubmition { get; set; }

        public string? Feedback { get; set; }


    }
}
