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

async function storeProgramId(programId) {
  localStorage.ProgramId = programId;
}

async function StoreInstructorId(instructorId) {
  localStorage.InstructorId = instructorId;
}

////////////////////////////////////////////////////////////////////////////////////
async function GetFirstThreePrograms() {
  let url = "https://localhost:44313/api/Program/GetPrograms/All";

  var ProgramContainer = document.getElementById("prgramCart");

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((program) => {
    ProgramContainer.innerHTML += `
        <li class="list-group-item" style="z-index: initial">
                        <div class="d-flex align-items-center">
                          <a
                            href="Program-Details.html"
                            class="avatar avatar-4by3 avatar-sm mr-3"
                            onclick = "storeProgramId(${program.programId})"
                          >
                            <img
                              src="/Images/${program.image}"
                              alt="course"
                              class="avatar-img rounded"
                            />
                          </a>
                          <div class="flex">
                            <a href="Program-Details.html" class="text-body" onclick = "storeProgramId(${program.programId})"

                              ><strong>${program.name}</strong></a
                            >
                          </div>
                        </div>
        </li>
    
    `;
  });
}

GetFirstThreePrograms();

/////////////////////////////////////////////////////////////////////////////////////////

async function GetAllPrograms() {
  let url = "https://localhost:44313/api/Program/GetPrograms/All";

  let request = await fetch(url);
  let data = await request.json();

  var allProgramsContainer = document.getElementById("allProgramsContainer");

  data.forEach((program) => {
    allProgramsContainer.innerHTML += `
    
            <div class="card">
                  <div class="card-header">
                    <div class="media">
                      <div class="media-left">
                       
                          <img
                            src="/Images/${program.image}"
                            alt="Card image cap"
                            width="120"
                            height = "90"
                            class="rounded"
                          />
                     
                      </div>
                      <div class="media-body">
                        <h4 class="card-title m-0">
                          <a href="Program-Details.html"  onclick="storeProgramId(${program.programId})"
                            >${program.name}</a
                          >
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
    `;
  });
}

GetAllPrograms();

//////////////////////////////////////////////////////////////////////////////////////////

async function AddProgram() {
  event.preventDefault();
  const url = `https://localhost:44313/api/Program/AddProgram`;

  var form = document.getElementById("AddProgramForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();

    setTimeout(() => {
      location.href = "AllPrograms.html";
    }, 2000);
  } else {
    console.error("Failed to update instructor info:", response.status);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////

async function GetProgramDetails() {
  var programId = localStorage.getItem("ProgramId");

  let url = `https://localhost:44313/api/Program/GetProgramById/${programId}`;

  let request = await fetch(url);
  let data = await request.json();

  var titlecontainer = document.getElementById("titlecontainer");
  titlecontainer.innerHTML = data.name;

  var form = document.getElementById("UpdateProgramDetails");

  form.innerHTML = `
  
                    <div class="form-group">
                          <label class="form-label" for="title">Name</label>
                          <input
                            type="text"
                            id="title"
                            class="form-control"
                            name="Name"
                            value="${data.name}"
                          />
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title">Title</label>
                          <input
                            type="text"
                            id="title"
                            class="form-control"
                            value="${data.title}"
                            name="Title"
                          />
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title">Price</label>
                          <input
                            type="text"
                            class="form-control"
                            value="${data.price}"
                            name="Price"
                          />
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title">Category</label>
                          <input
                            type="text"
                            class="form-control"
                            value="${data.category}"
                            name="Category"
                            readonly
                          />
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title"
                            >Period Time</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            value="${data.periodTime}"
                            name="PeriodTime"
                          />
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title"
                            >First Description</label
                          >
                          <textarea
                            type="text"
                            class="form-control"
                            name="Description1"
                          >
${data.description1}</textarea
                          >
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title"
                            >Second Description</label
                          >
                          <textarea
                            type="text"
                            class="form-control"
                            name="Description2"
                          >
${data.description2}</textarea
                          >
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title"
                            >Date Of Start</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            value="${data.dateOfStart.split("T")[0]}"
                            name="DateOfStart"
                          />
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title">Image</label>
                          <input
                            type="file"
                            class="form-control"
                            name="Image"
                          />
                        </div>

                        <div class="form-group">
                          <label class="form-label" for="title">Plan</label>
                          <input
                            type="file"
                            class="form-control"
                            name="Curriculum"
                          />
                        </div>

                        <div class="form-group float-right">
                          <button type="submit" class="btn btn-success">
                            Save
                          </button>
                        </div>`;

  var downloadPlan = document.getElementById("downloadPlan");
  downloadPlan.setAttribute("href", `/Plans/${data.curriculum}`);

  var instructors = document.getElementById("instructorsContainer");

  data.instructors.forEach((instructor) => {
    instructors.innerHTML += `
                        <div class="media-left">
                          <img
                            src="/Images/${instructor.image}"
                            alt="About Adrian"
                            width="50"
                            height = "50"                            
                            class="rounded-circle"
                          />
                        </div>
                        <div class="media-body">
                          <h4 class="card-title">
                            <a href = "Instructor-profile.html" onclick = "StoreInstructorId(${instructor.instructorId})">${instructor.firstName} ${instructor.secondName}</a>
                          </h4>
                        </div>
                        <hr />
                        
    
    `;
  });
}

GetProgramDetails();

//////////////////////////////////////////////////////////////////////////////////////////

async function UpdateProgramDetails() {
  event.preventDefault();
  var programId = localStorage.getItem("ProgramId");
  const url = `https://localhost:44313/api/Program/UpdateProgram/${programId}`;

  var form = document.getElementById("UpdateProgramDetails");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();

    setTimeout(() => {
      location.reload();
    }, 2000);
  } else {
    console.error("Failed to update instructor info:", response.status);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////

async function DeleteProgram() {
  event.preventDefault();
  var programId = localStorage.getItem("ProgramId");

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this program?",
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
          `https://localhost:44313/api/Program/DeleteProgram/${programId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          location.href = "AllPrograms.html";
        }
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////////////

async function StoreStudentId(studentId) {
  localStorage.StudentId = studentId;
}

//////////////////////////////////////////////////////////////////////////////////////////

async function GetStudentsByProgramId() {
  var ProgramId = localStorage.getItem("ProgramId");

  let url = `https://localhost:44313/api/Student/GetStudents/${ProgramId}`;

  let request = await fetch(url);
  let data = await request.json();

  var studentContener = document.getElementById("studentContener");

  data.forEach((student) => {
    studentContener.innerHTML += `
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
               
              </div>
            </div>
          </div>
        </li>
      `;
  });
}

GetStudentsByProgramId();
