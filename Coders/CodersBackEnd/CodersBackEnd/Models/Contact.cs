using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Contact
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }

    public DateTime? RequestDate { get; set; }

    public string? AdminName { get; set; }

    public string? AdminResponse { get; set; }

    public DateTime? RsponseDate { get; set; }

    public string? Status { get; set; }
}
