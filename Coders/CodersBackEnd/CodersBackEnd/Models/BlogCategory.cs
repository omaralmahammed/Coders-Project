using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class BlogCategory
{
    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public string? CategoryImage { get; set; }

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();
}
