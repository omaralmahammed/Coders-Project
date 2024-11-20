namespace CodersBackEnd.DTO
{
    public class BlogRequestDTO
    {

        public string? Name { get; set; }

        public string? MainTitle { get; set; }

        public string? FirstParaghraph { get; set; }

        public string? SecondParaghraph { get; set; }

        public string? SubTitle { get; set; }

        public string? ThirdParaghraph { get; set; }

        public IFormFile? FirstImage { get; set; }

        public IFormFile?  SecondImage { get; set; }

        public string? Auther { get; set; }

        public DateTime? DateOfPost { get; set; }

        public string? Status { get; set; }

        public int? CategoryId { get; set; }


    }
}
