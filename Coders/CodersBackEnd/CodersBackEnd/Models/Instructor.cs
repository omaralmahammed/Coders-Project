using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Instructor
{
    public int InstructorId { get; set; }

    public string? FirstName { get; set; }

    public string? SecondName { get; set; }

    public string? Email { get; set; }

    public string? LinkInProfile { get; set; }

    public string? Password { get; set; }

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public string? Image { get; set; }

    public string? Description { get; set; }

    public string? Education { get; set; }

    public int? ProgramId { get; set; }

    public virtual Program? Program { get; set; }
}
