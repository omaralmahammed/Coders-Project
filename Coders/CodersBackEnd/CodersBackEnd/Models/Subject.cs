using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Subject
{
    public int SubjectId { get; set; }

    public string? SubjectName { get; set; }

    public int? TechnologyId { get; set; }

    public virtual ICollection<Content> Contents { get; set; } = new List<Content>();

    public virtual Technology? Technology { get; set; }
}
