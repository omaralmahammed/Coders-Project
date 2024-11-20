using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class AssignmentSubmition
{
    public int AssignmentSubmitionId { get; set; }

    public int? AssignmentId { get; set; }

    public int? StudentId { get; set; }

    public int? ProgramId { get; set; }

    public string? Solution { get; set; }

    public DateTime? DateOfSubmition { get; set; }

    public string? Feedback { get; set; }

    public virtual Assignment? Assignment { get; set; }

    public virtual Program? Program { get; set; }

    public virtual Student? Student { get; set; }
}
