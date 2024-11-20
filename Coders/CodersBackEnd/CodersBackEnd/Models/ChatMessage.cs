using System;
using System.Collections.Generic;

namespace CodersBackEnd.Models;

public partial class ChatMessage
{
    public int ChatMessageId { get; set; }

    public int? ChatRoomId { get; set; }

    public string? MessageText { get; set; }

    public DateTime? SentAt { get; set; }

    public string? SenderType { get; set; }

    public string? Status { get; set; }
}
