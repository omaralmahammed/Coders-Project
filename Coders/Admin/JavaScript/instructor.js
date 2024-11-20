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

async function StoreInstructorId(instructorId) {
  localStorage.InstructorId = instructorId;
  window.location.href = "Instructor-profile.html";
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function InstructerLogin() {
  event.preventDefault();
  let url = "https://localhost:44313/api/Instructor/InstructorsLogin";

  var form = document.getElementById("LoginForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  let data = await response.json();

  if (response.ok) {
    localStorage.InstructerIdAfetrLogin = data.instructorId;

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "You have logged in successfully!",
    });

    setTimeout(() => {
      location.href = "Index-dashboard.html";
    }, 1500);
  } else if (response.status === 401) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password. Please try again.",
    });
  } else {
    throw new Error("Unexpected error");
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetFirstFourInstructer() {
  let url = "https://localhost:44313/api/Instructor/GetFirstFourInstructer";

  var instructorContainer = document.getElementById("instructorName");

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((instructor) => {
    instructorContainer.innerHTML += `
    
        <li class="list-group-item forum-thread">
                        <div class="media align-items-center">
                          <div class="media-left">
                            <div class="forum-icon-wrapper">
                                <img
                                  src="/images/${instructor.image}"
                                  alt="${instructor.image}"
                                  width="50"
                                  height = "50"
                                  class="rounded-circle"
                                />
                              </a>
                            </div>
                          </div>
                            <div class="media-body">
                              <div class="d-flex align-items-center">
                              <a href="Instructor-profile.html" class="text-body" onclick="StoreInstructorId(${instructor.instructorId})"
                                ><strong>${instructor.firstName} ${instructor.secondName}</strong></a
                              >
                              
                            </div>
                            
                          </div>
                        </div>
        </li>
    `;
  });
}

GetFirstFourInstructer();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetAllInstructors() {
  let url = "https://localhost:44313/api/Instructor/GetAllInstructers";

  var instructorContainer = document.getElementById("allInstructors");

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((instructor) => {
    instructorContainer.innerHTML += `
      
         <li class="list-group-item forum-thread" id="instructor-${instructor.instructorId}">
            <div class="media align-items-center">
              <div class="media-left">
                <div class="forum-icon-wrapper">
                  <img
                    src="/images/${instructor.image}"
                    alt="${instructor.image}"
                    width="50"
                    height = "50"
                    class="rounded-circle"
                  />
                </div>
              </div>
              <div class="media-body">
                <div class="d-flex justify-content-between align-items-center">
                  <a class="text-body" onclick="StoreInstructorId(${instructor.instructorId})">
                    <strong>${instructor.firstName} ${instructor.secondName}</strong>
                  </a>
                  <!-- Delete button -->
                  <button class="btn btn-danger " onclick="deleteInstructor(${instructor.instructorId})">
                    Remove 
                  </button>
                </div>
              </div>
            </div>
          </li>

      `;
  });
}

GetAllInstructors();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function deleteInstructor(instructorIddd) {
  event.preventDefault();

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this instructor?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://localhost:44313/api/Instructor/RemoveInstructors/${instructorIddd}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          location.reload();
        }
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetInstructorDetails() {
  var InstructorId = localStorage.getItem("InstructorId");
  let url = `https://localhost:44313/api/Instructor/GetInstructerDeetailsAdmin/${InstructorId}`;

  let request = await fetch(url);
  let data = await request.json();

  var InstructorDetailsContainer = document.getElementById("instructorDetails");
  InstructorDetailsContainer.innerHTML = `
                  <h1 class="h2 mb-1"> ${data.firstName} ${data.secondName}</h1>
                  <p class="d-flex align-items-center mb-4">
                    <a href="${data.linkInProfile}"  target="_blank" class="btn btn-sm btn-success mr-2"
                      >LinkdIn Profile</a
                    >
                  </p>
                  <div class="text-muted d-flex align-items-center mb-4">
                    <i class="material-icons mr-1">location_on</i>
                    <div class="flex">Jordan, Amman</div>
                  </div>

                  <h4>About me</h4>
                  <p class="text-black-70 measure-paragraph">
                    ${data.description}
                  </p>

                  <h4>Education</h4>
                  <p class="text-black-70 measure-paragraph">
                    ${data.education}
                  </p>
  `;

  var InstructerProgramContainer = document.getElementById("instructerProgram");

  InstructerProgramContainer.innerHTML = `
                  <div class="card">
                    <div class="card-header">
                      <div class="d-flex align-items-center">
                        <a href="student-take-course.html" class="mr-3">
                          <img
                            src="/Images/${data.programImage}"
                            alt=""
                            class="rounded"
                            width="100"
                          />
                        </a>
                        <div class="flex">
                          <h4 class="card-title mb-0">

                            <a href="student-take-course.html">${data.programName}</a>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
  `;

  var InstructorImageContainer = document.getElementById("instructorImage");
  InstructorImageContainer.innerHTML = `
                <img
                  src="/Images/${data.image}"
                  alt="avatar"
                  class="avatar-img rounded-circle border-3"
                />
  `;
}

GetInstructorDetails();
////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetInstructorDetailsForUpdate() {
  try {
    var InstructorId = localStorage.getItem("InstructorId");
    const response = await fetch(
      `https://localhost:44313/api/Instructor/GetInstructerDeetailsAdmin/${InstructorId}`
    );
    const data = await response.json();

    // Populate form fields if the value is not null or undefined
    if (data.firstName) {
      document.getElementById("firstName").value = data.firstName;
    }

    if (data.secondName) {
      document.getElementById("lastName").value = data.secondName;
    }

    if (data.email) {
      document.getElementById("email").value = data.email;
    }

    if (data.linkInProfile) {
      document.getElementById("linkedIn").value = data.linkInProfile;
    }

    if (data.description) {
      document.getElementById("about").value = data.description;
    }

    if (data.education) {
      document.getElementById("education").value = data.education;
    }
  } catch (error) {
    console.error("Error fetching instructor data:", error);
  }
}

GetInstructorDetailsForUpdate();
////////////////////////////////////////////////////////////////////////////////////////////////////////

async function UpdateInstructerInfo() {
  event.preventDefault();
  var InstructorId = localStorage.getItem("InstructorId");
  const url = `https://localhost:44313/api/Instructor/UpdateInstructerInfo/${InstructorId}`;

  var form = document.getElementById("InstructerDetailsForm");
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function InsertProgeamList() {
  let url = "https://localhost:44313/api/Program/GetPrograms/All";

  var programListCountener = document.getElementById("programList");

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((program) => {
    programListCountener.innerHTML += `
    <option value="${program.programId}">${program.name}</option>
 `;
  });
}

InsertProgeamList();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function AddInstructer() {
  event.preventDefault();
  const url = `https://localhost:44313/api/Instructor/AddInstructors`;

  var form = document.getElementById("AddInstructorForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();

    setTimeout(() => {
      location.href = "All-Instructors.html";
    }, 2000);
  } else {
    console.error("Failed to update instructor info:", response.status);
  }
}
