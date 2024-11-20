using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class BillingDetail
{
    public int BillingId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? County { get; set; }

    public string? Postcode { get; set; }

    public int? UserId { get; set; }

    public virtual User? User { get; set; }
}
