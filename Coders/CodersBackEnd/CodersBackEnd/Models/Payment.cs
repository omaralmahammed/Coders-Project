using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public string? Amount { get; set; }

    public string? PaymentMethod { get; set; }

    public string? TransactionId { get; set; }

    public string? PaymentStatus { get; set; }

    public DateTime? PaymentDate { get; set; }

    public int? UserId { get; set; }

    public int? ProgramId { get; set; }

    public virtual Program? Program { get; set; }

    public virtual User? User { get; set; }
}
