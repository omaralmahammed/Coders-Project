using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Content
{
    public int ContentId { get; set; }

    public string? ContentDetails { get; set; }

    public string? ContentTypes { get; set; }

    public int? SubjectId { get; set; }

    public virtual Subject? Subject { get; set; }
}
