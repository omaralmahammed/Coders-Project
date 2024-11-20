namespace CodersBackEnd.DTO
{
    public class InstructorInformationRequestDTO
    {
        public string? FirstName { get; set; }

        public string? SecondName { get; set; }

        public string? Email { get; set; }

        public string? LinkInProfile { get; set; }

        public string? Password { get; set; }

        public byte[]? PasswordHash { get; set; }

        public byte[]? PasswordSalt { get; set; }

        public IFormFile? Image { get; set; }

        public string? Description { get; set; }

        public string? Education { get; set; }

        public int? ProgramId { get; set; }

    }
}
