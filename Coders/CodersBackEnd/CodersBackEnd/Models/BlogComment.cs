using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class BlogComment
{
    public int CommentId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Comment { get; set; }

    public int? LikeNumber { get; set; }

    public DateTime? DateOfComment { get; set; }

    public string? Status { get; set; }

    public int? BlogId { get; set; }

    public virtual Blog? Blog { get; set; }
}
