/** @format */
async function getAllServices() {
  var container = document.getElementById("servicesContainer");

  let url = `https://localhost:44313/api/Services/AllServices`;

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((service) => {
    container.innerHTML += `

    <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div
                class="it-feature-item text-center"
                data-background="assets/img/feature/bg-1-1.jpg"
              >
                <div class="it-feature-item-content z-index">
                  <div class="it-feature-icon">
                    <span><i class="flaticon-class"></i></span>
                  </div>
                  <div class="it-feature-text pt-30">
                    <h4 class="it-feature-title">${service.name}</h4>
                    <p>
                      ${service.brief}
                    </p>
                  </div>
                  <div class="it-feature-button">
                    <button class="it-btn-border" onclick="storeServiceId(${service.serviceId})"  >
                      <span>
                        Learn More
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
            </div>
     `;
  });
}

getAllServices();

///////////////////////////////////////////////////////////////////////////////////////////////
// store service id in local storage

async function storeServiceId(serviceId) {
  localStorage.ServiceId = serviceId;

  window.location.href = "service-details.html";
}

///////////////////////////////////////////////////////////////////////////////////////////////

async function getAllServicesCategories() {
  var servicesCategory = document.getElementById("servicesCategory");

  let url = `https://localhost:44313/api/Services/AllServices`;

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((service) => {
    servicesCategory.innerHTML += `
    <div class="it-sv-details-sidebar-category mb-10" onclick ="getServicesDetails(${service.serviceId})">
                ${service.name} <span><i class="fa-light fa-angle-right"></i></span>
    </div>
 `;
  });
}
getAllServicesCategories();

///////////////////////////////////////////////////////////////////////////////////////////////

async function getServicesDetails(
  ServiceId = localStorage.getItem("ServiceId")
) {
  let url = `https://localhost:44313/api/Services/ServicesById/${ServiceId}`;

  let request = await fetch(url);
  let data = await request.json();

  var firstParagraph = document.getElementById("firstParagraph");
  var secondParagraph = document.getElementById("secondParagraph");

  firstParagraph.innerHTML = `
  
        <h4 class="it-sv-details-title">${data.name}</h4>
        <p>${data.brief}</p>
  `;

  secondParagraph.innerHTML = `
        <h4 class="it-sv-details-title">service Description</h4>

        <p>${data.description}</p>
  `;
}

getServicesDetails();
