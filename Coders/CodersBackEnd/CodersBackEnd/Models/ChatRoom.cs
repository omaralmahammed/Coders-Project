using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class ChatRoom
{
    public int ChatRoomId { get; set; }

    public int? InstructorId { get; set; }

    public int? StudentdId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int? NotificationNumber { get; set; }
}
