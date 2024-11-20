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

async function StoreStudentId(studentId) {
  localStorage.StudentId = studentId;
}

async function GetFirstFourStudents() {
  let url = `https://localhost:44313/api/Student/GetFirstFourStudents`;

  let request = await fetch(url);
  let data = await request.json();

  var studentContainer = document.getElementById("studentContainer");
  data.forEach((student) => {
    studentContainer.innerHTML += `
        <li class="list-group-item forum-thread">
                        <div class="media align-items-center">
                          <div class="media-left">
                            <div class="forum-icon-wrapper">
                                <img
                                  src="/Images/${student.user.image}"
                                  alt=""
                                  width="50"
                                  height ="50"
                                  class="rounded-circle"
                                />
                              </a>
                            </div>
                          </div>
                          <div class="media-body">
                            <div class="d-flex align-items-center">
                              <a href="Student-profile.html" class="text-body" onclick = "StoreStudentId(${student.studentId})"
                                ><strong>${student.user.firstName}  ${student.user.lastName}</strong></a
                              >
                            </div>
                          </div>
                        </div>
        </li>
    
    `;
  });
}

GetFirstFourStudents();

////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetPorgramName() {
  let url = `https://localhost:44313/api/Program/GetPrograms/All`;

  let request = await fetch(url);
  let data = await request.json();

  var programsName = document.getElementById("programsName");

  data.forEach((program) => {
    programsName.innerHTML += `
      
      <option value="${program.programId}">${program.name}</option>
  
      `;
  });
}

GetPorgramName();

////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetStudents() {
  var programsName = document.getElementById("programsName").value;

  let url = `https://localhost:44313/api/Student/GetStudents/${programsName}`;

  var allStudentsContanier = document.getElementById("allStudentsContanier");

  allStudentsContanier.innerHTML = "";

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((student) => {
    allStudentsContanier.innerHTML += `
        <li class="list-group-item forum-thread">
          <div class="media align-items-center">
            <div class="media-left">
              <div class="forum-icon-wrapper">
                <img
                  src="/images/${student.user.image}"
                  alt="${student.user.image}"
                  width="50"
                  height="50"
                  class="rounded-circle"
                />
              </div>
            </div>
            <div class="media-body">
              <div class="d-flex justify-content-between align-items-center">
                <a href="Student-profile.html" class="text-body" onclick="StoreStudentId(${student.studentId})">
                  <strong>${student.user.firstName} ${student.user.lastName}</strong>
                </a>
                <!-- Delete button -->
                <button type ="button" class="btn btn-danger" onclick = "DeleteStudent(${student.studentId}) ">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </li>
      `;
  });
}

GetStudents();

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function DeleteStudent(studentId) {
  event.preventDefault();

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this Student?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    customClass: {
      confirmButton: "swal2-confirm",
      cancelButton: "swal2-cancel",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://localhost:44313/api/Student/deleteStudent/${studentId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          location.href = "All-Student.html";
        }
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetStudentDetails() {
  var StudentId = localStorage.getItem("StudentId");
  let url = `https://localhost:44313/api/Student/GetStudentDetails/${StudentId}`;

  let request = await fetch(url);
  let data = await request.json();

  var StudentDetailsContainer = document.getElementById("StudentDetails");

  StudentDetailsContainer.innerHTML = `
  <h1 class="h2 mb-1"> ${data.user.firstName || "Not set"} ${
    data.user.lastName || "Not set"
  }</h1>
  
  <div class="text-muted d-flex align-items-center mb-4">
    <i class="material-icons mr-1">location_on</i>
    <div class="flex">${data.user.country || "Country"}, ${
    data.user.city || "Cit  y"
  }</div>
  </div>

  <h4>Email</h4>
  <p class="text-black-70 measure-paragraph">
    ${data.user.email || "Not set"}
  </p>

  <h4>Phone Number</h4>
  <p class="text-black-70 measure-paragraph">
    ${data.user.phoneNumber || "0000000000"}
  </p>

  <h4>Date Of Birth</h4>
  <p class="text-black-70 measure-paragraph">
    ${data.user.dateOfBirth || "00/00/00"}
  </p>

  <h4>Gender</h4>
  <p class="text-black-70 measure-paragraph">
    ${data.user.gender || "Not set"}
  </p>
`;

  var studentProgramContainer = document.getElementById("studentProgram");

  studentProgramContainer.innerHTML = `
                    <div class="card">
                      <div class="card-header">
                        <div class="d-flex align-items-center">
                          <a href="#" class="mr-3">
                            <img
                              src="/Images/${data.program.image}"
                              alt=""
                              class="rounded"
                              width="100"
                            />
                          </a>
                          <div class="flex">
                            <h4 class="card-title mb-0">
  
                              <a href="#">${data.program.name}</a>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
    `;

  var studentImageContainer = document.getElementById("studentImage");

  studentImageContainer.innerHTML = `
                  <img
                    src="/Images/${data.user.image}"
                    alt="avatar"
                    class="avatar-img rounded-circle border-3"
                  />
    `;
}

GetStudentDetails();

///////////////////////////////////////////////////////////////////////////////////

async function GetStudentDetails1() {
  var StudentId = localStorage.getItem("StudentId");
  let url = `https://localhost:44313/api/Student/GetStudentDetails/${StudentId}`;

  let request = await fetch(url);
  let data = await request.json();

  // Populate the form fields with the fetched data
  document.getElementById("firstName").value = data.user.firstName || "";
  document.getElementById("lastName").value = data.user.lastName || " ";
  document.getElementById("email").value = data.user.email || " ";
  document.getElementById("PhoneNumber").value = data.user.phoneNumber || " ";
  document.getElementById("DateOfBirth").value = data.user.dateOfBirth
    ? new Date(data.user.dateOfBirth).toISOString().substr(0, 10)
    : " ";
  document.getElementById("Country").value = data.user.country || " ";
  document.getElementById("City").value = data.user.city || " ";
  document.getElementById("Postcode").value = data.user.postcode || " ";

  // Assuming you want to select the correct program in the dropdown
  let programSelect = document.getElementById("program");
  programSelect.innerHTML = `<option value="${data.program.programId}">${data.program.name}</option>`;
}

GetStudentDetails1();

////////////////////////////////////////////////////////////////////////

async function GetPorgramName1() {
  let url = `https://localhost:44313/api/Program/GetPrograms/All`;

  let request = await fetch(url);
  let data = await request.json();

  let programSelect = document.getElementById("program");

  data.forEach((program) => {
    programSelect.innerHTML += `
        
        <option value="${program.programId}">${program.name}</option>
    
        `;
  });
}
GetPorgramName1();

/////////////////////////////////////////////////////////////////////////////////////

async function UpdateStudentInfo() {
  event.preventDefault();
  var StudentDetailsForm = localStorage.getItem("StudentDetailsForm");
  var StudentId = localStorage.getItem("StudentId");

  const url = `https://localhost:44313/api/Student/UpdateStudentDetails/${StudentId}`;

  var form = document.getElementById("StudentDetailsForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();

    setTimeout(() => {
      location.href = "Student-profile.html";
    }, 2000);
  } else {
    console.error("Failed to update instructor info:", response.status);
  }
}
