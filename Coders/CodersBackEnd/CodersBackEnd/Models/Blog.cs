using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Blog
{
    public int BlogId { get; set; }

    public string? Name { get; set; }

    public string? MainTitle { get; set; }

    public string? FirstParaghraph { get; set; }

    public string? SecondParaghraph { get; set; }

    public string? SubTitle { get; set; }

    public string? ThirdParaghraph { get; set; }

    public string? FirstImage { get; set; }

    public string? SecondImage { get; set; }

    public string? Auther { get; set; }

    public DateTime? DateOfPost { get; set; }

    public string? Status { get; set; }

    public int? CategoryId { get; set; }

    public virtual ICollection<BlogComment> BlogComments { get; set; } = new List<BlogComment>();

    public virtual BlogCategory? Category { get; set; }
}
