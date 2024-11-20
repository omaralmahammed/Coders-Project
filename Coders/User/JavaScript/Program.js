/** @format */

async function storeProgramId(programId) {
  localStorage.ProgramId = programId;
  window.location.href = "course-details.html";
}

async function storeProgramCategory(catrgory) {
  localStorage.programCategory = catrgory;
  window.location.reload();
}

async function storeInstructorId(instructorId) {
  localStorage.InstructorId = instructorId;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function GetPrograms(category = "All") {
  let url = `https://localhost:44313/api/Program/GetPrograms/${category}`;

  var title = document.getElementById("category");
  title.innerHTML = category;

  let request = await fetch(url);
  let data = await request.json();

  renderPrograms(data);
}

// Render programs dynamically
function renderPrograms(programs) {
  var ProgramContainer = document.getElementById("ProgramContainer");
  ProgramContainer.innerHTML = "";

  programs.forEach((program) => {
    var i = 0;
    ProgramContainer.innerHTML += `
      <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
        <div class="it-course-item">
          <div class="it-course-thumb mb-20 p-relative">
            <button onclick="storeProgramId(${program.programId})">
              <img src="/Images/${program.image}" alt="" />
            </button>
            <div class="it-course-thumb-text">
              <span>${program.periodTime}</span>
            </div>
          </div>
          <div class="it-course-content">
            <h4 class="it-course-title pb-5" style="height:30px">
              <a href="course-details.html">${program.name}</a>
            </h4>
            <div class="it-course-author pb-15">
              <p style="height:90px">${program.title}</p>
            </div>
            <div class="it-course-author pb-15">
              <span>By <i>${program.instructors[i].firstName} ${program.instructors[0].secondName}</i></span>
            </div>
            <div class="it-course-price-box d-flex flex-column align-items-start">
                <span><i>$${program.price}</i></span>
                <button onclick="storeProgramId(${program.programId})" class="it-btn-yellow">
                  <i class="fa fa-cart-shopping">View The Course</i> 
                </button>
            </div>
          </div>
        </div>
      </div>
    `;
    i++;
  });
}

// Fetch categories and create buttons
async function GetProgramsCategories() {
  let url = `https://localhost:44313/api/Program/GetPrograms/All`;

  let request = await fetch(url);
  let data = await request.json();

  let uniqueCategories = new Set();

  data.forEach((programCategory) => {
    uniqueCategories.add(programCategory.category);
  });
  var categoriesContainer = document.getElementById("categoriesContainer");

  categoriesContainer.innerHTML += `
    <li class="list-group-item">
      <input type="radio" id="categoryAll" name="category" value="All" onchange="GetPrograms('All')" checked>
      <label for="categoryAll">All</label>
    </li>

  `;

  // Add radio buttons for unique categories
  uniqueCategories.forEach((category) => {
    categoriesContainer.innerHTML += `
      <li  class="list-group-item">
        <input type="radio" id="category${category}" name="category" value="${category}" onchange="GetPrograms('${category}')">
        <label for="category${category}">${category}</label>
      </li>
    `;
  });
}

GetPrograms();
GetProgramsCategories();

/////////////////////////////////////////////////////////////////////////////////////////////////

async function PrgramDetails() {
  var ProgramId = localStorage.getItem("ProgramId");
  let url = `https://localhost:44313/api/Program/GetProgramById/${ProgramId}`;

  let request = await fetch(url);
  let data = await request.json();

  var title = document.getElementById("title");
  title.innerHTML = `${data.title}`;

  var PriceContainer = document.getElementById("priceContainer");
  PriceContainer.innerHTML = `$${data.price}`;

  var DurationContainer = document.getElementById("duration");
  DurationContainer.innerHTML = `${data.periodTime}`;

  var OverviewCountenar = document.getElementById("overviewCountenar");
  OverviewCountenar.innerHTML = `
    <div class="it-evn-details-text mb-40">
        <h6 class="it-evn-details-title-sm pb-5">
          Course Description
        </h6>
        <p>
          ${data.description1}
        </p>
    </div>
    <div class="it-evn-details-text">
        <h6 class="it-evn-details-title-sm pb-5">
          What Will I Learn From This Course?
        </h6>
        <p>
          ${data.description2}
        </p>
    </div>
 
 `;

  var CurriculumCountenar = document.getElementById("curriculumCountenar");

  CurriculumCountenar.innerHTML = `
    <div class="it-evn-details-text mb-40">       
      <a href="/Plans/${data.curriculum}" class="btn btn-success" download>
        Downlod Curriculum
      </a> 
    </div>
  `;

  var InstructorCountenar = document.getElementById("instructorCountenar");
  console.log(data.instructors);

  data.instructors.forEach((instructor) => {
    InstructorCountenar.innerHTML += ` 
              <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
                <div class="it-team-3-item text-center">
                  <div class="it-team-3-thumb fix">
                  <img src="/Images/${instructor.image}" alt="" height="240" />
                  </div>
                  <div class="it-team-3-content">
                    <div class="it-team-3-author-box">
                      <h4 class="it-team-3-title">
                        <a href="teacher-details.html" onclick="storeInstructorId(${instructor.instructorId})">${instructor.firstName} ${instructor.secondName}</a>
                      </h4>
                      <span>Instructor</span>
                    </div>
                  </div>
                </div>
              </div>
      `;
  });
}

PrgramDetails();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function checkIfLogin() {
  var UserId = localStorage.getItem("UserId");
  if (UserId) {
    window.location.href = "checkout.html";
  } else {
    localStorage.PaymentProcess = "True";
    Swal.fire({
      icon: "info",
      title: "You Must be Login!",
    });

    setTimeout(() => {
      location.href = "signin.html";
    }, 1700);
  }
}
