/** @format */

async function GetRecentPost() {
  var url = "https://localhost:44313/api/Blog/GetRecentPost/3";
  var recentPostCountener = document.getElementById("recentPostCountener");

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((blog) => {
    recentPostCountener.innerHTML += `
      
            <div class="col-xl-4 col-lg-4 col-md-6 mb-30" height = "300">
                <div
                  class="it-blog-item-box"
                  data-background="assets/img/blog/bg-1.jpg"
                >
                  <div class="it-blog-item">
                    <div class="it-blog-thumb fix">
                      <a href="blog-details.html" onclick="storeBlogId(${
                        blog.blogId
                      })"
                        ><img src="/Images/${
                          blog.firstImage
                        }" alt="" height = "250"
                      /></a>
                    </div>
                    <br>
                    <div class="it-blog-meta pb-15">
                      <span>
                        <i class="fa-solid fa-calendar-days"></i>
                        ${blog.dateOfPost.split("T")[0]}</span
                      >
                      
                    </div>
                    <h4 class="it-blog-title" style = "height:150px">
                      <a href="blog-details.html"
                        >${blog.mainTitle}</a
                      >
                    </h4>
                    <button class="it-btn-theme-sm" onclick="storeBlogId(${
                      blog.blogId
                    })">
                      <span>
                        read more
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
                    </button>
                  </div>
                </div>
              </div>
      
          `;
  });
}

GetRecentPost();

async function storeBlogId(blogId) {
  localStorage.BlogId = blogId;

  window.location.href = "blog-details.html";
}

//////////////////////////////////////////////////////////////////////////////////////////////

async function GetFirstThreePrograms() {
  let url = "https://localhost:44313/api/Program/GetFirstThreePrograms";

  var ProgramContainer = document.getElementById("ProgramContainer");

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((program) => {
    ProgramContainer.innerHTML += `

      <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div class="it-course-item">
                <div class="it-course-thumb mb-20 p-relative">
                  <button onclick = "storeProgramId(${program.programId})"
                    ><img
                      src="/Images/${program.image}"
                      alt=""
                      height = "290"
                  /></button>
                  <div class="it-course-thumb-text">
                    <span>${program.periodTime}</span>
                  </div>
                </div>
                <div class="it-course-content">
                  
                  <h4 class="it-course-title pb-5">
                    <a href="course-details.html"
                      >${program.name}</a>
                  </h4>

                  <div class="it-course-author pb-15">
                    <span>By <i>${program.instructors[0].firstName} ${program.instructors[0].secondName}</i></span>
                  </div>
                  <div
                    class="it-course-price-box d-flex justify-content-between"
                  >
                    <span><i>$${program.price}</i></span>
                    <button onclick = "storeProgramId(${program.programId})" class="it-btn-yellow"
                      ><i class="fa fa-cart-shopping"></i> View The Course</button>
                  </div>
                </div>
              </div>
            </div>
    `;
  });
}

GetFirstThreePrograms();

async function storeProgramId(programId) {
  localStorage.ProgramId = programId;
  window.location.href = "course-details.html";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetInstructors() {
  let url = "https://localhost:44313/api/Instructor/GetFirstFourInstructer";

  var instructorContainer = document.getElementById("instructorContainer");

  let request = await fetch(url);
  let data = await request.json();
  data.forEach((instructor) => {
    instructorContainer.innerHTML += `
      <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
        <div class="it-team-3-item text-center">
          <div class="it-team-3-thumb fix" onclick="StoreInstructorId(${instructor.instructorId})">
            <img src="/Images/${instructor.image}" alt="${instructor.image}"  height = "290" />
          </div>
          <div class="it-team-3-content">
            <div class="it-team-3-author-box">
              <h4 class="it-team-3-title">
                <button type="button" onclick="StoreInstructorId(${instructor.instructorId})">
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

async function StoreInstructorId(instructorId) {
  localStorage.InstructorId = instructorId;
  window.location.href = "teacher-details.html";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetFirstFourServices() {
  let url = "https://localhost:44313/api/Services/FirstFourServices";

  var blogContainer = document.getElementById("blogContainer");

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((service) => {
    blogContainer.innerHTML += `
    <div class="col-xl-3 col-lg-6 col-md-6">
      <div class="it-feature-3-item mb-30 text-center">
        <div class="it-feature-3-icon">
          <span><i class="flaticon-coach"></i></span>
        </div>
        <div class="it-feature-3-content">
          <h4 class="it-feature-3-title">
            <a href="service-details.html" onclick="storeServiceId(${service.serviceId})">${service.name}</a>
          </h4>
          <p>${service.brief}</p>
        </div>
        <div class="it-feature-3-btn">
          <a class="it-btn-theme-sm" href="service-details.html" onclick="storeServiceId(${service.serviceId})">
            <span>
              View Details
              <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1.24023L16 7.24023L11 13.2402" stroke="currentcolor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 7.24023H16" stroke="currentcolor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
    `;
  });
}

GetFirstFourServices();

async function storeServiceId(serviceId) {
  localStorage.ServiceId = serviceId;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
async function storeCategoryId(categoryId) {
  localStorage.CategoryId = categoryId;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
