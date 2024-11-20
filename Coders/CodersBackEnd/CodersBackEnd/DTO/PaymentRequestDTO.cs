namespace CodersBackEnd.DTO
{
    public class PaymentRequestDTO
    {
        public string? Amount { get; set; }
        public int? UserId { get; set; }
        public int? ProgramId { get; set; }
        public string? ProductName { get; set; }
        public string? SuccessUrl { get; set; }
        public string? CancelUrl { get; set; }
    }
}
