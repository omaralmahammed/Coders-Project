namespace CodersBackEnd.DTO
{
    public class StudentRequestDTO
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? Otp { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string? Gender { get; set; }
        public string? Country { get; set; }

        public string? City { get; set; }

        public string? Postcode { get; set; }

        public string? PhoneNumber { get; set; }

        public IFormFile? Image { get; set; }

        public int? ProgramId { get; set; }

    }
}
