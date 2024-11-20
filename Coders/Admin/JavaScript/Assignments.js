/** @format */

function showSuccessToast() {
  Swal.fire({
    toast: true,
    icon: "success",
    title: "Successfully",
    animation: false,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
}

async function DeleteAssignment(assignmentId) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this Assignment?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://localhost:44313/api/Assignment/DeleteAssignment/${assignmentId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire("Deleted!", "Your assignment has been deleted.", "success");
          location.reload();
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
}

async function GetPorgramName() {
  let url = `https://localhost:44313/api/Program/GetPrograms/All`;

  let request = await fetch(url);
  let data = await request.json();

  let programSelect = document.getElementById("programSelect");

  data.forEach((program) => {
    programSelect.innerHTML += `
        
          <option value="${program.programId}">${program.name}</option>
    
        `;
  });
}
GetPorgramName();

async function storeAssignmentId(assignmentId, programId) {
  localStorage.AssignmentId = assignmentId;
  localStorage.ProgramId = programId;
}

async function GetAssignments() {
  var programName = document.getElementById("programSelect").value;

  let url = `https://localhost:44313/api/Assignment/GetAssignments/${programName}`;

  var assignmentsContainer = document.getElementById("assignmentsContainer");

  assignmentsContainer.innerHTML = "";

  let request = await fetch(url);
  let data = await request.json();

  let n = 1;
  data.forEach((assignment) => {
    assignmentsContainer.innerHTML += `
    <li class="list-group-item">
      <div class="media">
        <div class="media-left">
          <div class="text-muted-light">${n}.</div>
        </div>
        <a href="Assignments-Details.html" onclick="storeAssignmentId(${assignment.assignmentId}, ${assignment.programId})" class="media-body">${assignment.assignmentTitle}</a>
        <div class="media-body">
          <a href="/Plans/${assignment.assignmentName}" class="badge badge-info" download>Instullation</a>
        </div>
        <div class="media-right">
          <button onclick="DeleteAssignment(${assignment.assignmentId})" class="badge badge-danger">X</button>
        </div>
      </div>
    </li>

    `;
    n++;
  });
}

GetAssignments();

async function AddAssignment(event) {
  event.preventDefault();

  const url = `https://localhost:44313/api/Assignment/AddAssignmentByAdmin`;

  var form = document.getElementById("AddAssignmentForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();
    setTimeout(() => {
      window.location.href = "Assignments.html";
    }, 3000);
  } else {
    const errorText = await response.text();
    console.error(
      "Failed to update instructor info:",
      response.status,
      errorText
    );
  }
}

async function GetAssignmentDetails() {
  var AssignmentId = localStorage.getItem("AssignmentId");
  let url = `https://localhost:44313/api/Assignment/GetAssignmentsDetails/${AssignmentId}`;

  let request = await fetch(url);
  let data = await request.json();

  var assignmentsDetailsContainer =
    document.getElementById("assignmentsDetails");

  assignmentsDetailsContainer.innerHTML = `
  
    <h2>${data.assignmentTitle}</h2>
    <p>Assignment Details: <a href="/Plans/${
      data.assignmentName
    }" download>Download File</a></p>
    <p>Program:${data.program.name}</p>
    <p>Deadtime: ${data.deadTime.split("T")[0]}</p>
  `;
}
GetAssignmentDetails();

async function storeStudentIdAndAssignmentId(studentId, assignmentId) {
  localStorage.StudentId = studentId;
  localStorage.AssignmentId = assignmentId;
}

async function GetStudents() {
  var AssignmentId = localStorage.getItem("AssignmentId");
  var ProgramId = localStorage.getItem("ProgramId");

  let url = `https://localhost:44313/api/Student/AssignmentStudents/${AssignmentId}/${ProgramId}`;

  var studentsContainer1 = document.getElementById("studentsContainer1");

  let request = await fetch(url);
  let data = await request.json();

  let n = 0;
  data.uploaded.forEach((assignment) => {
    studentsContainer1.innerHTML += `
    <li class="list-group-item">
      <div class="media">
        <div class="media-left">
          <div class="text-muted-light">${n + 1}.</div>
        </div>
        <a href="Assignments-Submition.html" onclick = "storeStudentIdAndAssignmentId(${
          assignment.studentId
        }, ${assignment.assignmentId})"  class="media-body">${
      assignment.firstName
    } ${assignment.lastName}</a>
      </div>
    </li>

    `;
    n++;
  });

  var StudentWhoUploaded = (document.getElementById(
    "StudentWhoUploaded"
  ).innerHTML = `Numbers: (${n})`);

  var studentsContainer2 = document.getElementById("studentsContainer2");

  let y = 0;
  data.notUploaded.forEach((assignment) => {
    studentsContainer2.innerHTML += `
    <li class="list-group-item">
      <div class="media">
        <div class="media-left">
          <div class="text-muted-light">${y + 1}.</div>
        </div>
        <p class="media-body">${assignment.firstName} ${assignment.lastName}</p>
      </div>
    </li>

    `;
    y++;
  });
  var StudentWhoNotUploaded = (document.getElementById(
    "StudentWhoNotUploaded"
  ).innerHTML = `Numbers: (${y})`);
}
GetStudents();

async function GetSolution() {
  var AssignmentId = localStorage.getItem("AssignmentId");
  var StudentId = localStorage.getItem("StudentId");

  let request = await fetch(
    `https://localhost:44313/api/Assignment/GetSolutionByStudentId/${StudentId}/${AssignmentId}`
  );
  let data = await request.json();

  studentsSubmition = document.getElementById("studentsSubmition");
  feedback = document.getElementById("Feedback");

  let n = 0;
  data.forEach((solution) => {
    studentsSubmition.innerHTML += `
    <li class="list-group-item">
      <div class="media">
        <div class="media-left">
          <div class="text-muted-light">${n + 1}.</div>
        </div>

        <a href="${solution.solution}" class="media-body" target="_blank">${
      solution.solution
    }</a>
        <div class="text-muted-light">${
          solution.dateOfSubmition.split("T")[0]
        }</div>
      </div>
    </li>
    `;
    n++;

    feedback.innerHTML = solution.feedback;
  });
}

GetSolution();

async function GetStudentDetails() {
  var StudentId = localStorage.getItem("StudentId");

  let request = await fetch(
    `https://localhost:44313/api/Student/GetStudentDetails/${StudentId}`
  );
  let data = await request.json();

  StudentDetailasContainer = document.getElementById("StudentDetailas");

  StudentDetailasContainer.innerHTML = `
  
    <h2>${data.user.firstName} ${data.user.lastName}</h2>
    <p>Email:<a href="mailto:${data.user.email}"> ${data.user.email} </a></p>
    <p>Program:${data.program.name}</p>
  `;
}

GetStudentDetails();

async function AddFeedback(event) {
  event.preventDefault();

  var AssignmentId = localStorage.getItem("AssignmentId");
  var StudentId = localStorage.getItem("StudentId");
  var Feedback = document.getElementById("Feedback").value;

  var url = "https://localhost:44313/api/Assignment/AddFeedback";

  var data = {
    assignmentId: AssignmentId,
    studentId: StudentId,
    feedback: Feedback,
  };

  let response = await fetch(url, {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    showSuccessToast();
  } else {
    const errorText = await response.text();
    console.error("Failed to send feedback:", response.status, errorText);
  }
}
