using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Program
{
    public int ProgramId { get; set; }

    public string? Name { get; set; }

    public string? Title { get; set; }

    public string? Price { get; set; }

    public string? Image { get; set; }

    public string? Category { get; set; }

    public string? PeriodTime { get; set; }

    public string? Description1 { get; set; }

    public string? Description2 { get; set; }

    public string? Curriculum { get; set; }

    public DateTime? DateOfStart { get; set; }

    public virtual ICollection<AssignmentSubmition> AssignmentSubmitions { get; set; } = new List<AssignmentSubmition>();

    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    public virtual ICollection<Instructor> Instructors { get; set; } = new List<Instructor>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();

    public virtual ICollection<Technology> Technologies { get; set; } = new List<Technology>();
}
