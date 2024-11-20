/** @format */

async function AddHeader() {
  var header = document.getElementById("header");

  header.innerHTML = `
          <div class="mdk-header__content">
          <!-- Navbar -->
          <nav
            id="default-navbar"
            class="navbar navbar-expand navbar-dark bg-primary m-0"
          >
            <div class="container-fluid">
              <!-- Toggle sidebar -->
              <button
                class="navbar-toggler d-block"
                data-toggle="sidebar"
                type="button"
              >
                <span class="material-icons">menu</span>
              </button>

              <!-- Brand -->
              <a href="student-dashboard.html" class="navbar-brand">
                <img
                  src="assets/images/logo/white.svg"
                  class="mr-2"
                  alt="LearnPlus"
                />
                <span class="d-none d-xs-md-block">Coders</span>
              </a>

              <div class="flex"></div>

              <!-- Menu -->

              <!-- Menu -->
              <ul class="nav navbar-nav flex-nowrap">
                <!-- User dropdown -->
                <li class="nav-item  ml-1 ml-md-3">
                  <a
                    href="InstructorChat.html"
                    onmouseover="this.style.color='black';"
                  >
                    <i
                      class="sidebar-menu-icon sidebar-menu-icon--left material-icons"
                      style="color: white;"
                      >comment</i
                    >
                  </a>
                </li>
                <li class="nav-item dropdown ml-1 ml-md-3">
                  <a
                    class="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    ><img
                      src="/Images/default.jpg"
                      alt="Avatar"
                      class="rounded-circle"
                      width="40"
                  /></a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="student-profile.html">
                      <i class="material-icons">person</i>Profile
                    </a>
                    <a class="dropdown-item" href="admin-login.html">
                      <i class="material-icons">lock</i> Logout
                    </a>
                  </div>
                </li>
                <!-- // END User dropdown -->
              </ul>
              <!-- // END Menu -->
            </div>
          </nav>
          <!-- // END Navbar -->
        </div>
    `;
}

AddHeader();

/////////////////////////////////////////////////////////////////////////////////////////////////

async function storeProgramId(programId) {
  localStorage.ProgramId = programId;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetProgramNames() {
  let url = `https://localhost:44313/api/Program/GetPrograms/All`;

  let request = await fetch(url);
  let data = await request.json();

  var materialPrograms = document.getElementById("materialPrograms");

  data.forEach((program) => {
    materialPrograms.innerHTML += `
                  <li class="sidebar-menu-item">
                      <a class="sidebar-menu-button" href="Technology.html" onclick = "storeProgramId(${program.programId})">
                          <span class="sidebar-menu-text">${program.name}</span>
                      </a>
                  </li>          
          `;
  });
}
GetProgramNames();
