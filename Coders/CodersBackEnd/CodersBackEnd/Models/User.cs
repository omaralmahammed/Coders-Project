using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public string? Otp { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string? Country { get; set; }

    public string? City { get; set; }

    public string? Postcode { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<BillingDetail> BillingDetails { get; set; } = new List<BillingDetail>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
