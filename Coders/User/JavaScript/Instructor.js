/** @format */
var InstructorId = localStorage.getItem("InstructorId");

async function GetInstructorDetails() {
  let url = `https://localhost:44313/api/Instructor/GetInstructerDeetails/${InstructorId}`;

  let request = await fetch(url);
  let data = await request.json();

  var InstructorDetailsContainer = document.getElementById("InstructorDetails");

  InstructorDetailsContainer.innerHTML = `
  
   <div class="col-xl-3 col-lg-3">
                <div class="it-teacher-details-left">
                  <div class="it-teacher-details-left-thumb">
                    <img src="/Images/${data.image}" alt="" />
                  </div>
                  <div class="it-teacher-details-left-social text-center">
                    <a href="${data.linkInProfile}" target = "_blank"><i class="fab fa-linkedin-in"></i></a>
                  </div>
                  <div class="it-teacher-details-left-info">
                    <ul>
                    
                    
                      <li>
                        <i class="fa-light fa-envelope"></i>
                         <a href="mailto:${data.email}">
                            ${data.email}
                          </a>
                      </li>
                    </ul>
                  </div>
                  <div class="it-teacher-details-left-btn">
                    <a class="it-btn" href="contact.html">
                      <span>
                        Contact us
                        <svg
                          width="17"
                          height="14"
                          viewBox="0 0 17 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 1.24023L16 7.24023L11 13.2402"
                            stroke="currentcolor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1 7.24023H16"
                            stroke="currentcolor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 col-lg-9">
                <div class="it-teacher-details-right">
                  <div class="it-teacher-details-right-title-box">
                    <h4>${data.firstName} ${data.secondName}</h4>
                    <span>Instructer</span>
                    <p>
                    ${data.description}
                    </p>
                  
                  </div>
                  <div class="it-teacher-details-right-content mb-40">
                    <h4>Education:</h4>
                    <p>
                      ${data.education}
                    </p>
                  </div>
                </div>
              </div>
  `;
}

GetInstructorDetails();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetInstructors() {
  let url = "https://localhost:44313/api/Instructor/GetAllInstructers";

  var instructorContainer = document.getElementById("instructorContainer");

  let request = await fetch(url);
  let data = await request.json();
  data.forEach((instructor) => {
    instructorContainer.innerHTML += `
      <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
        <div class="it-team-3-item text-center" >
          <div class="it-team-3-thumb fix" onclick="StoreInstructorId(${instructor.instructorId})">
            <img src="/Images/${instructor.image}" alt="${instructor.image}"  height = "290" />
          </div>
          <div class="it-team-3-content">
            <div class="it-team-3-author-box">
              <h4 class="it-team-3-title" >
                <button type="button" onclick="StoreInstructorId(${instructor.instructorId})" >
                  ${instructor.firstName} ${instructor.secondName}
                </button>
              </h4>
              <span>Instructor</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

GetInstructors();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function StoreInstructorId(instructorId) {
  localStorage.InstructorId = instructorId;
  window.location.href = "teacher-details.html";
}
