/** @format */
async function storeStudentId(studentId) {
  localStorage.setItem("StudentId", studentId);
}

async function getStudentProgram() {
  var studentProgram = document.getElementById("studentProgram");
  var UserId = localStorage.getItem("UserId");

  let url = `https://localhost:44313/api/Student/GetStudentDetailsByUserId/${UserId}`;

  let request = await fetch(url);

  if (request.ok) {
    let data = await request.json();

    studentProgram.innerHTML = `
        <div class="it-course-item">
            <div class="it-course-thumb mb-20 p-relative">
              <a href = "my-program-details.html" onclick = "storeStudentId(${data.studentId})">
                <img src="/Images/${data.program.image}" alt="" height="175" />
              </a>
            </div>
            <div class="it-course-content">
              <h4 class="it-course-title pb-5">
                <a href="course-details.html">${data.program.name}</a>
              </h4>
              <div class="it-course-price-box d-flex justify-content-between">
                <a href = "my-program-details.html" class="it-btn-yellow" onclick = "storeStudentId(${data.studentId})">Start Now</a>
              </div>
            </div>
        </div>
      `;
  }

  if (!request.ok) {
    studentProgram.innerHTML = `
        <div class="it-course-item">
          <div class="it-course-content">
            <h4 class="it-course-title pb-5">You don't have any program!</h4>
            <br> <br>
            
            <div class="it-course-price-box d-flex" >
                <a href="course-2.html" class="it-btn-yellow">Subscribe Now</a>
            </div>
          </div>
        </div>
      `;
  }
}
getStudentProgram();

//////////////////////////////////////////////////////////////////////////////////////////////

async function storeAssignmentIdAndProgramId(assignmentId, programId) {
  localStorage.setItem("AssignmentId", assignmentId);
  localStorage.ProgramId = programId;
}

async function GetAssignments() {
  var assignmentContainer = document.getElementById("assignmentContainer");
  var StudentId = localStorage.getItem("StudentId");

  let url = `https://localhost:44313/api/Assignment/GetAssignmentsForStudent/${StudentId}`;

  let request = await fetch(url);
  let data = await request.json();
  let n = 1;
  data.forEach((assignment) => {
    assignmentContainer.innerHTML += `

         <div class="it-student-regiform-item" >
            <span>${n}.</span>
            <a href="Assignment-Submition.html" onclick="storeAssignmentIdAndProgramId(${assignment.assignmentId},${assignment.programId})">${assignment.assignmentTitle} </a>
        </div>
        <hr>
    
    `;
    n++;
  });
}

GetAssignments();

//////////////////////////////////////////////////////////////////////////////////////////////

async function GetAssignmentDetails() {
  var assignmentTitle = document.getElementById("assignmentTitle");
  var AssignmentId = localStorage.getItem("AssignmentId");

  let url = `https://localhost:44313/api/Assignment/GetAssignmentsDetails/${AssignmentId}`;

  let request = await fetch(url);
  let data = await request.json();

  assignmentTitle.innerHTML = `
  <div style="border: solid 1px black; margin: 2vh; padding:2vh ;">
      <p>Title: ${data.assignmentTitle}</p>
      <p>Description: </br> ${data.description}
      <p>Show Assignment: <a onMouseOver="this.style.color='red'" onMouseOut="this.style.color='green'" style="" href="/Plans/${
        data.assignmentName
      }"  download >Downlod</a> </p>
      <p>Deadline: ${data.deadTime.split("T")[0]}</p>
  </div>
  `;
}

GetAssignmentDetails();

//////////////////////////////////////////////////////////////////////////////////////////////

async function submitAssignment() {
  event.preventDefault();
  var AssignmentId = localStorage.getItem("AssignmentId");
  var StudentId = localStorage.getItem("StudentId");
  var ProgramId = localStorage.getItem("ProgramId");

  var Solution = document.getElementById("solution").value;

  var data = {
    assignmentId: AssignmentId,
    studentId: StudentId,
    programId: ProgramId,
    solution: Solution,
  };

  let url = "https://localhost:44313/api/Assignment/AddAssignmentByStudent";

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    location.reload();
  }
}

async function GetSolution() {
  var AssignmentId = localStorage.getItem("AssignmentId");
  var StudentId = localStorage.getItem("StudentId");

  let request = await fetch(
    `https://localhost:44313/api/Assignment/GetSolutionByStudentId/${StudentId}/${AssignmentId}`
  );
  let data = await request.json();

  var submitionContainer = document.getElementById("submition");
  var feedbackContainer = document.getElementById("feedback");

  if (data != null) {
    data.forEach((solution) => {
      submitionContainer.innerHTML += `
     
                  <div style="display: flex; justify-content: space-between; padding:1vh;" >
                    <a onMouseOver="this.style.color='red'" onMouseOut="this.style.color='black'" target="_blank" href="${
                      solution.solution
                    }">${solution.solution}</a>
                    <p>${solution.dateOfSubmition.split("T")[0]}</p>
                  </div>
                  <hr>
    `;
    });

    data.forEach((feedback) => {
      feedbackContainer.innerHTML += `
        <div style="padding:1vh;" >

                    <p>${feedback.feedback.split("T")[0]}</p>
        </div>
        <hr>
      `;
    });
  }
}

GetSolution();
