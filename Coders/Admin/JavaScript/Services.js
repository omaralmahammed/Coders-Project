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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function StoreServiceId(serviceId) {
  localStorage.ServiceId = serviceId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetAllServices() {
  let url = "https://localhost:44313/api/Services/AllServices";

  var allServices = document.getElementById("allServices");

  let request = await fetch(url);
  let data = await request.json();

  var n = 1;
  data.forEach((service) => {
    allServices.innerHTML += `
        
            <li class="list-group-item forum-thread">
                <div class="media align-items-center">
                    <div class="media-body">
                        <div class="d-flex justify-content-between align-items-center">

                        <div class="d-flex align-items-center">
                                <span class = "mr-2">${n++})</span>
                                <a href="Service-Details.html" onclick="StoreServiceId(${
                                  service.serviceId
                                })" class="text-body ms-3"> 
                                    <strong>${service.name}</strong>
                                </a>
                            </div>
                            <!-- Delete button aligned to the right -->
                            <a class="text-danger" onclick = "DeleteService(${
                              service.serviceId
                            })">
                                Remove
                            </a>
                        </div>
                    </div>
                </div>
            </li>


  
        `;
  });
}

GetAllServices();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetServiceDetails() {
  try {
    let ServiceId = localStorage.getItem("ServiceId");
    const response = await fetch(
      `https://localhost:44313/api/Services/ServicesById/${ServiceId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    document.getElementById("name").value = data.name || "";
    document.getElementById("brief").value = data.brief || "";
    document.getElementById("description").value = data.description || "";
  } catch (error) {
    console.error("There was an issue fetching the service details:", error);
  }
}

GetServiceDetails();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function UpdateServiceDetails(event) {
  event.preventDefault();
  let ServiceId = localStorage.getItem("ServiceId");

  const url = `https://localhost:44313/api/Services/UpdateService/${ServiceId}`;

  var form = document.getElementById("UpdateServiceForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();

    setTimeout(() => {
      location.href = "Services.html";
    }, 2000);
  } else {
    console.error("Failed to update instructor info:", response.status);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function AddService(event) {
  event.preventDefault();

  const url = `https://localhost:44313/api/Services/AddService`;

  var form = document.getElementById("AddServiceForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();

    setTimeout(() => {
      location.href = "Services.html";
    }, 2000);
  } else {
    console.error("Failed to update instructor info:", response.status);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function DeleteService(ServiceId) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this service?",
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
          `https://localhost:44313/api/Services/DeleteService/${ServiceId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          location.href = "Services.html";
        }
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
}
