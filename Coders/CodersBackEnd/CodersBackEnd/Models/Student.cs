using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Student
{
    public int StudentId { get; set; }

    public int? UserId { get; set; }

    public int? ProgramId { get; set; }

    public virtual ICollection<AssignmentSubmition> AssignmentSubmitions { get; set; } = new List<AssignmentSubmition>();

    public virtual Program? Program { get; set; }

    public virtual User? User { get; set; }
}
