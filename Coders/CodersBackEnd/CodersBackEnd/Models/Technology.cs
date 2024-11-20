using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Technology
{
    public int TechnologyId { get; set; }

    public string? TechnologyName { get; set; }

    public int? ProgramId { get; set; }

    public virtual Program? Program { get; set; }

    public virtual ICollection<Subject> Subjects { get; set; } = new List<Subject>();
}
