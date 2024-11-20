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

// Technology Sections

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function DeleteTechnology(technologyId) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this Technology?If you delete it you will delete all subject and content releated to it!",
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
          `https://localhost:44313/api/Material/DeleteTechnology/${technologyId}`,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function StoreTechnologyId(technologyId) {
  localStorage.TechnologyId = technologyId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetTechnology() {
  var ProgramId = localStorage.getItem("ProgramId");

  let url = `https://localhost:44313/api/Material/GetTechnology/0/${ProgramId}`;

  let request = await fetch(url);
  let data = await request.json();

  var technologiesContainer = document.getElementById("technologiesContainer");

  document.getElementById("title").innerHTML = data[0].program.name;

  let n = 1;
  data.forEach((technology) => {
    technologiesContainer.innerHTML += `
      <li class="list-group-item">
        <div class="media">
          <div class="media-left">
            <div class="text-muted-light">${n}.</div>
          </div>
          <a href="Subjects.html" class="media-body" onclick = "StoreTechnologyId(${technology.technologyId})">${technology.technologyName} </a>
          <div class="media-right">
            <a  class="text-danger" style="cursor: pointer; text-decoration: none;" onclick="DeleteTechnology(${technology.technologyId})">X</a>
          </div>
        </div>
      </li>
  
      `;
    n++;
  });
}
GetTechnology();

////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function AddTechnology(event) {
  event.preventDefault();
  let url = `https://localhost:44313/api/Material/AddTechnology`;

  var ProgramId = localStorage.getItem("ProgramId");
  var TechnologyName = document.getElementById("TechnologyName").value;

  let data = {
    programId: ProgramId,
    technologyName: TechnologyName,
  };

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    showSuccessToast();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Subject Sections

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function StoreSubjectId(subjectId) {
  localStorage.SubjectId = subjectId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function DeleteSubject(subjectId) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this Subject?If you delete it you will delete all content releated to it!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://localhost:44313/api/Material/DeleteSubject/${subjectId}`,
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetSubjects() {
  var TechnologyId = localStorage.getItem("TechnologyId");

  let url = `https://localhost:44313/api/Material/GetSubjects/${TechnologyId}`;

  var subjectContainer = document.getElementById("subjectContainer");

  let request = await fetch(url);
  let data = await request.json();

  document.getElementById("subjectTitle").innerHTML =
    data[0].technology.technologyName;

  let n = 1;
  data.forEach((subject) => {
    subjectContainer.innerHTML += `
        <li class="list-group-item">
          <div class="media">
            <div class="media-left">
              <div class="text-muted-light">${n}.</div>
            </div>
            <a href="Subjects-Content.html" class="media-body" onclick = "StoreSubjectId(${subject.subjectId})">${subject.subjectName} </a>
            <div class="media-right">
              <a  class="text-danger" style="cursor: pointer; text-decoration: none;" onclick="DeleteSubject(${subject.subjectId})">X</a>
            </div>
          </div>
        </li>
    
        `;
    n++;
  });
}
GetSubjects();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function AddSubject(event) {
  event.preventDefault();
  let url = `https://localhost:44313/api/Material/AddSubject`;

  var TechnologyId = localStorage.getItem("TechnologyId");
  var SubjectName = document.getElementById("SubjectName").value;

  let data = {
    technologyId: TechnologyId,
    subjectName: SubjectName,
  };

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    showSuccessToast();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Content Sections

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function DeleteContent(contentId) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this Content?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://localhost:44313/api/Material/DeleteContent/${contentId}`,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetContent() {
  var SubjectId = localStorage.getItem("SubjectId");

  let url = `https://localhost:44313/api/Material/GetContent/${SubjectId}`;

  var textContentContainer = document.getElementById("textContentContainer");
  var resourcesContentContainer = document.getElementById(
    "resourcesContentContainer"
  );
  var videoContentContainer = document.getElementById("videoContentContainer");

  let request = await fetch(url);
  let data = await request.json();

  let n = 1;
  data.forEach((content) => {
    if (content.contentTypes === "Text") {
      textContentContainer.innerHTML += `
        <li class="list-group-item">
          <div class="media">
            <div class="media-left">
              <div class="text-muted-light">${n}.</div>
            </div>
            <p  class="media-body">${content.contentDetails} </p>
            <div class="media-right">
              <a  class="text-danger" style="cursor: pointer; text-decoration: none;" onclick="DeleteContent(${content.contentId})">X</a>
            </div>
          </div>
        </li>
    
        `;
      n++;
    }
  });

  let y = 1;
  data.forEach((content) => {
    if (content.contentTypes === "Url") {
      resourcesContentContainer.innerHTML += `
        <li class="list-group-item">
          <div class="media">
            <div class="media-left">
              <div class="text-muted-light">${y}.</div>
            </div>
            <a href="${content.contentDetails}" target="_blank" class="media-body">${content.contentDetails} </a>
            <div class="media-right">
              <a  class="text-danger"  style="cursor: pointer; text-decoration: none;" onclick="DeleteContent(${content.contentId})">X</a>
            </div>
          </div>
        </li>
    
        `;
      y++;
    }
  });

  data.forEach((content) => {
    if (content.contentTypes === "Video") {
      const videoUrl = content.contentDetails;
      const videoId = videoUrl.split("v=")[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      console.log(embedUrl);

      videoContentContainer.innerHTML += `
        <li class="list-group-item">
          <div class="media">
            <iframe 
              src="${embedUrl}" 
              frameborder="0" 
              width="860" 
              height="415" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </li>
    
        `;
    }
  });
}
GetContent();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function AddContent(event, type, inputValue) {
  event.preventDefault();
  let url = `https://localhost:44313/api/Material/AddContent/${type}`;

  var SubjectId = localStorage.getItem("SubjectId");
  var material = document.getElementById(inputValue).value;

  let data = {
    subjectId: SubjectId,
    contentDetails: material,
  };

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    showSuccessToast();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

// Student Sections

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function GetStudentMaterial() {
  var StudentId = localStorage.getItem("StudentId");
  let url = `https://localhost:44313/api/Material/GetTechnology/${StudentId}/0`;

  let request = await fetch(url);
  let technologyData = await request.json();

  var TechnologyContainer = document.getElementById("TechnologyContainer");

  technologyData.forEach((technology, index) => {
    const technologyId = `technology${index}`;
    const menuId = `blogs_menu${index}`;

    // Create a new list item
    const li = document.createElement("li");
    li.className = "sidebar-menu-item";

    // Toggle the dropdown using onclick
    li.innerHTML = `
      <a
        class="sidebar-menu-button dropdown-btn"
        onclick="toggleDropdown('${menuId}')"
      >
       <i
                          class="sidebar-menu-icon sidebar-menu-icon--left material-icons"
                          >folder</i
                        >
                        ${technology.technologyName}
                        <span class="ml-auto sidebar-menu-toggle-icon"></span>
       
      </a>
  
      <ul
        class="sidebar-submenu sm-indent collapse"
        id="${menuId}"  
        style="display: none;"  
      >
        
      </ul>
    `;

    TechnologyContainer.appendChild(li);

    LoadSubjects(technology.technologyId, menuId);
  });
}

// Toggle dropdown display function
function toggleDropdown(menuId) {
  var dropdown = document.getElementById(menuId);
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}

async function LoadSubjects(technologyId, menuId) {
  let url = `https://localhost:44313/api/Material/GetSubjects/${technologyId}`;
  let request = await fetch(url);
  let subjectData = await request.json();

  var subjectContainer = document.getElementById(menuId);

  subjectData.forEach((subject) => {
    subjectContainer.innerHTML += `
            <li class="sidebar-menu-item">
              <a class="sidebar-menu-button"  style="cursor: default;" 
                    onmouseover="this.style.cursor='pointer'" 
                    onmouseout="this.style.cursor='default'"
                    onclick="GetAllContent(${subject.subjectId})">
                <span class="sidebar-menu-text">${subject.subjectName}</span>
              </a>
            </li>
        `;
  });
}

GetStudentMaterial();

async function GetAllContent(subjectId) {
  let url = `https://localhost:44313/api/Material/GetAllContent`;
  let request = await fetch(url);
  let contentData = await request.json();

  var textContainer = document.getElementById("textContainer");
  var resourceContainer = document.getElementById("resourceContaner");
  var videoContainer = document.getElementById("videoContainer");

  textContainer.innerHTML = "";
  resourceContainer.innerHTML = "";
  videoContainer.innerHTML = "";

  contentData.forEach((content) => {
    if (content.subjectId === subjectId) {
      if (content.contentTypes === "Text") {
        textContainer.innerHTML += `<p>${content.contentDetails}</p>`;
      } else if (content.contentTypes === "Url") {
        resourceContainer.innerHTML += `
          <li class="list-group-item">
            <a href="${content.contentDetails}" target="_blank">${content.contentDetails}</a>
          </li>
        `;
      } else if (content.contentTypes === "Video") {
        const videoUrl = content.contentDetails;
        const videoId = videoUrl.split("v=")[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        console.log(embedUrl);

        videoContainer.innerHTML += `
        <li class="list-group-item">
          <div class="media">
            <iframe 
              src="${embedUrl}" 
              frameborder="0" 
              width="860" 
              height="415" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </li>
        `;
      }
    }
  });
}

GetAllContent(7);
