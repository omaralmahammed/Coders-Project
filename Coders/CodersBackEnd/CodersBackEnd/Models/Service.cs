using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class Service
{
    public int ServiceId { get; set; }

    public string? Name { get; set; }

    public string? Brief { get; set; }

    public string? Description { get; set; }
}
