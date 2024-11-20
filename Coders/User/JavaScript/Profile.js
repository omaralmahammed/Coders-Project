/** @format */

var userId = localStorage.getItem("UserId");
var userPassword;

async function getUserInfo() {
  var container = document.getElementById("profileContainer");

  let url = `https://localhost:44313/api/User/UserDetails/${userId}`;

  let request = await fetch(url);
  let data = await request.json();
  userPassword = data.password;

  container.innerHTML = `

        <div class="it-student-regiform mb-40 text-center">
            <img onclick="changeImage()" src="/Images/${
              data.image
            }"  alt="Profile Image" class="circle-img">
        </div>

         <form id="infoForm" onsubmit="updatInfo()" enctype="multipart/form-data">
                  <div class="it-student-regiform mb-40">
                    <h4 class="it-student-regiform-title">Credentials</h4>
                      <input type="file" id="imageUpload" accept="image/*" style="display:none" name="Image">

                      <div class="it-student-regiform-wrap">
                        <div class="it-student-regiform-item">
                          <label>Email </label>
                          <input type="text" name="Email" value="${
                            data.email
                          }" readonly/>
                        </div>
                        <div class="it-student-regiform-item">
                          <label>Current Password</label>
                          <input type="password" id="currentPassword"/>
                        </div>
                        <div class="it-student-regiform-item">
                          <label> New Password</label>
                          <input type="password" name="Password" id="newPassword"/>
                        </div>
                        <div class="it-student-regiform-item">
                          <label> Confirm Password</label>
                          <input type="password" id="confirmNewPassword"/>
                        </div>
                      </div>
                    
                  </div>
                  <div class="it-student-regiform">
                    <h4 class="it-student-regiform-title">Profile information</h4>
                      <div class="it-student-regiform-wrap">
                        <div class="row">
                          <div class="col-xl-6">
                            <div class="it-student-regiform-item">
                              <label>First Name</label>
                              <input type="text" name="FirstName" value="${
                                data.firstName
                              }" />
                            </div>
                          </div>

                          <div class="col-xl-6">
                            <div class="it-student-regiform-item">
                              <label>Last Name</label>
                              <input type="text" name="LastName"  value="${
                                data.lastName
                              }"/>
                            </div>
                          </div>
                          <div class="col-xl-6">
                            <div class="it-student-regiform-item">
                              <label>Birth Date</label>
                              <input type="date" name="DateOfBirth" value="${
                                data.dateOfBirth
                                  ? data.dateOfBirth.split("T")[0]
                                  : ""
                              }"/>
                            </div>
                          </div>

                          <div class="col-xl-6">
                            <div class="it-student-regiform-item">
                              <label>Gender:</label>
                              
                              <div class="postbox__select">
                                <select name="Gender" >

                                  <option slected>Select gender</option>

                                  <option value="Male" ${
                                    data.gender === "Male" ? "selected" : ""
                                  }>Male</option>
                                  s
                                  <option value="Female" ${
                                    data.gender === "Female" ? "selected" : ""
                                  }>Female</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        
                          <div class="col-xl-6">
                            <div class="it-student-regiform-item">
                              <label>Country </label>
                              <input type="text" name="Country" value="${
                                data.country ? data.country : "Not specified"
                              }"/>
                            </div>
                          </div>
                          <div class="col-xl-6">
                            <div class="it-student-regiform-item">
                              <label>City</label>
                              <input type="text" name="City" value="${
                                data.city ? data.city : "Not specified"
                              }"/>
                            </div>
                          </div>
                          <div class="col-xl-6">
                            <div class="it-student-regiform-item">
                              <label>Postcode / ZIP</label>
                              <input type="text" name="Postcode" value="${
                                data.postcode ? data.postcode : "Not specified"
                              }"/>
                            </div>
                          </div>

                          <div class="col-xl-6">
                            <div class="it-student-regiform-item">
                              <label>Phone Number</label>
                              <input type="text" name="PhoneNumber" value="${
                                data.phoneNumber
                                  ? data.phoneNumber
                                  : "Not specified"
                              }"/>
                            </div>
                          </div>
                        </div>
                        
                        <p id="PasswordError" class="text-danger" style="display: none"></p>
                        
                        <div class="it-student-regiform-btn">
                          <button type="submit" class="it-btn">
                            <span>
                              Save Change
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
            </form>
    `;
}

getUserInfo();

////////////////////////////////////////////////////////////////////////////////////////////

async function changeImage() {
  document.getElementById("imageUpload").click();
}

////////////////////////////////////////////////////////////////////////////////////////////

async function updatInfo() {
  event.preventDefault();

  try {
    var isValid = true;

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;

    if (currentPassword !== "") {
      if (currentPassword !== userPassword) {
        document.getElementById("PasswordError").innerText =
          "Current Password incorrect";
        document.getElementById("PasswordError").style.display = "block";
        isValid = false;
      }
    }

    if (newPassword !== confirmPassword) {
      document.getElementById("PasswordError").innerText =
        "New Password and Confirm New Password don't match";
      document.getElementById("PasswordError").style.display = "block";
      isValid = false;
    }

    var url = `https://localhost:44313/api/User/UpdateUserDetails/${userId}`;
    var form = document.getElementById("infoForm");
    var formData = new FormData(form);

    if (isValid) {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      }
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    window.location.href = "404.html";
  }
}
