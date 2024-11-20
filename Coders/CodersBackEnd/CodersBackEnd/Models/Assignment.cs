using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Assignment
{
    public int AssignmentId { get; set; }

    public string? AssignmentName { get; set; }

    public string? AssignmentTitle { get; set; }

    public DateTime? DeadTime { get; set; }

    public int? ProgramId { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<AssignmentSubmition> AssignmentSubmitions { get; set; } = new List<AssignmentSubmition>();

    public virtual Program? Program { get; set; }
}
