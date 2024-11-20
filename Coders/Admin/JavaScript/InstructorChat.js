/** @format */
var InstructorId = localStorage.getItem("InstructerIdAfetrLogin");

async function GetWhomItIsSent() {
  let url = `https://localhost:44313/api/Chat/GetWhomItIsSent/${InstructorId}/instructor`;

  let request = await fetch(url);
  let data = await request.json();

  var instructorContainer = document.getElementById("instructorContainer");

  data.forEach((element) => {
    instructorContainer.innerHTML += `
    
    <li class="list-group-item px-4 py-3 bg-light">
                        <a
                          href="#"
                          class="d-flex align-items-center position-relative"
                          onclick= "CreateRoom(${element.studentId})"
                        >
                          <span
                            class="avatar avatar-sm  mr-3 flex-shrink-0"
                          >
                            <img
                              src="/Images/${element.user.image}"
                              alt="Avatar"
                              class="avatar-img rounded-circle"
                            />
                          </span>
                          <span
                            class="flex d-flex flex-column"
                            style="max-width: 175px"
                          >
                            <strong class="text-body">${element.user.firstName} ${element.user.lastName}</strong>
                          </span>
                          <span id="notification-${element.studentId}" class="badge badge-notifications badge-danger"></span>
                        </a>
    </li>
  `;

    GetNotifications(element.studentId);
  });
}

GetWhomItIsSent();

async function GetNotifications(StudentId) {
  let url = `https://localhost:44313/api/Chat/GetNotificationNumber/${StudentId}/${InstructorId}`;
  let request = await fetch(url);
  let data = await request.json();

  var instructorNotification = document.getElementById(
    `notification-${StudentId}`
  );
  instructorNotification.innerHTML = "";

  if (request.ok) {
    if (data.privateMessageNumber === 0) {
      instructorNotification.innerHTML = "";
    } else {
      instructorNotification.innerHTML = data.privateMessageNumber;
    }
  } else {
    instructorNotification.innerHTML = "";
  }
}

function GetMessages() {
  var StudentId = localStorage.getItem("StudentIdForChat");

  let url = `https://localhost:44313/api/Chat/GetMessages/${StudentId}/${InstructorId}`;
  var messagesContainer = $("#messagesContainer");
  messagesContainer.html("");

  $.ajax({
    url: url,
    method: "GET",
    success: function (data) {
      var instructorNameTitle = $("#instructorNameTitle");
      var instructorImageTitle = $("#instructorImageTitle");

      data.forEach((item) => {
        let [date, time] = item.message.sentAt.split("T");
        let [hour, minute] = time.split(":");

        if (item.message.senderType == "Student") {
          messagesContainer.append(`
            <li class=" d-inline-flex" >
            <div class="message__aside">
                <a href="instructor-profile.html" class="avatar">
                  <img
                    src="/Images/${item.student.image}"
                    alt="people"
                    class="avatar-img rounded-circle"
                  />
                </a>
              </div>
              <div class="message__body card">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex mr-3">
                      <a href="instructor-profile.html" class="text-body">
                        <strong>${item.student.name}</strong>
                      </a>
                    </div>
                    <div>
                      <small class="text-muted">${date} ${hour}:${minute}</small>
                    </div>
                  </div>
                  <span class="text-black-70">${item.message.messageText}</span>
                </div>
              </div>
              
            </li>
          `);

          instructorNameTitle.html(item.student.name);

          instructorImageTitle.html(`
            <img
              src="/Images/${item.student.image}"
              alt="people"
              class="avatar-img rounded-circle"
            />
          `);
        } else {
          messagesContainer.append(`
            <li class=" d-inline-flex" style="justify-content: flex-end;">
              <div class="message__body card">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex mr-3">
                      <a href="instructor-profile.html" class="text-body">
                        <strong>${item.instructor.name}</strong>
                      </a>
                    </div>
                    <div>
                      <small class="text-muted">${date} ${hour}:${minute}</small>
                    </div>
                  </div>
                  <span class="text-black-70">${item.message.messageText}</span>
                </div>
              </div>
              <div class="message__aside ml-3">
                <a href="instructor-profile.html" class="avatar">
                  <img
                    src="/Images/${item.instructor.image}"
                    alt="people"
                    class="avatar-img rounded-circle"
                  />
                </a>
              </div>
            </li>
          `);

          instructorNameTitle.html(item.student.name);

          instructorImageTitle.html(`
            <img
              src="/Images/${item.student.image}"
              alt="people"
              class="avatar-img rounded-circle"
            />
          `);
        }
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching messages:", error);
    },
  });
}

setInterval(GetMessages, 3000);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function CreateRoom(StudentId) {
  let url = `https://localhost:44313/api/Chat/CreateRoom/${StudentId}/${InstructorId}`;
  let request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const form = document.getElementById("message-reply");
  form.setAttribute("onsubmit", `SendMessage(${StudentId})`);

  if (request.ok) {
    localStorage.StudentIdForChat = StudentId;
    GetMessages();
  } else {
    console.log("error durring create the room");
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function SendMessage(StudentId) {
  let url = `https://localhost:44313/api/Chat/AddMessage/${StudentId}/${InstructorId}`;

  var MessageText = document.getElementById("MessageText");

  try {
    let request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageText: MessageText.value,
        senderType: "Instructor",
      }),
    });

    if (!request.ok) {
      throw new Error(`Error: ${request.status} - ${request.statusText}`);
    }

    if (request.ok) {
      MessageText.value = "";
      localStorage.StudentIdForChat = StudentId;
      GetMessages();
    }
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}
