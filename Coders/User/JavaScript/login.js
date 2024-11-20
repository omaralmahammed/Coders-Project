/** @format */

/// Registration by form

async function Registration() {
  event.preventDefault();
  let isValid = true;

  // Clear previous error messages
  document.getElementById("firstNameError").style.display = "none";
  document.getElementById("lastNameError").style.display = "none";
  document.getElementById("emailError").style.display = "none";
  document.getElementById("passwordError").style.display = "none";
  document.getElementById("confirmPasswordError").style.display = "none";

  const firstName = document.getElementById("FirstName").value;
  const lastName = document.getElementById("LastName").value;
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;
  const confirmPassword = document.getElementById("ConfirmPassword").value;

  // Validate First Name
  if (firstName.trim() === "") {
    document.getElementById("firstNameError").innerText =
      "First name is required";
    document.getElementById("firstNameError").style.display = "block";
    isValid = false;
  }

  // Validate Last Name
  if (lastName.trim() === "") {
    document.getElementById("lastNameError").innerText =
      "Last name is required";
    document.getElementById("lastNameError").style.display = "block";
    isValid = false;
  }

  // Validate Email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").innerText =
      "Enter a valid email address";
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }

  // Validate Password
  if (password.length < 6) {
    document.getElementById("passwordError").innerText =
      "Password must be at least 6 characters";
    document.getElementById("passwordError").style.display = "block";
    isValid = false;
  }

  // Validate Confirm Password
  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").innerText =
      "Passwords do not match";
    document.getElementById("confirmPasswordError").style.display = "block";
    isValid = false;
  }

  // If form is valid, submit the form
  if (isValid) {
    try {
      const url = "https://localhost:44313/api/User/Register";
      var form = document.getElementById("RegisterForm");
      var formData = new FormData(form);

      let response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = "signin.html";
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "The email address is already in use. Please use a different email.",
        });
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      window.location.href = "404.html";
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

///Login by form

async function Login() {
  event.preventDefault();

  const url = "https://localhost:44313/api/User/Login";
  var form = document.getElementById("LoginForm");
  var formData = new FormData(form);

  try {
    let response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let data = await response.json();

      localStorage.setItem("Token", data.token);
      localStorage.setItem("UserId", data.userId);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have logged in successfully!",
      });

      setTimeout(() => {
        var payment = localStorage.getItem("PaymentProcess");
        if (payment) {
          localStorage.removeItem("PaymentProcess");
          location.href = "course-details.html";
        } else {
          location.href = "Index.html";
        }
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
  } catch (error) {
    window.location.href = "404.html";
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
// Forget Password

var forgotPasswordPopup = document.getElementById("forgotPasswordModal");
var newPasswordPopup = document.getElementById("enterNewPasswordModal");

// Open the modal when the button is clicked
async function openForgetPassword() {
  event.preventDefault();

  forgotPasswordPopup.style.display = "block";
}

// Close the modal when the "x" is clicked
async function closeForgetPassword() {
  event.preventDefault();

  forgotPasswordPopup.style.display = "none";
}

async function ForgotPassword() {
  event.preventDefault();

  const url = "https://localhost:44313/api/User/ForgotPassword";

  var form = document.getElementById("forgotPasswordForm");
  var email = form.elements["email"].value;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "OTP was send!",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        forgotPasswordPopup.style.display = "none";
        newPasswordPopup.style.display = "block";
      });
    } else if (response.status === 404) {
      Swal.fire({
        icon: "error",
        title: "The Email address is not found. Please check your email!",
        showConfirmButton: false,
      });
    }
  } catch (error) {
    window.location.href = "404.html";
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////
//New Password

async function closeEnterNewPassword() {
  event.preventDefault();

  newPasswordPopup.style.display = "none";
}

async function SetNewPassword() {
  event.preventDefault();

  var form = document.getElementById("setNewPasswordForm");
  var formData = new FormData(form);

  var NewPassword = form.elements["Password"].value;
  var ConfirmNewPassword = form.elements["ConfirmNewPassword"].value;

  if (ConfirmNewPassword !== NewPassword) {
    document.getElementById("newPasError").style.display = "block";
    isValid = false;
  } else {
    isValid = true;
  }

  const url = "https://localhost:44313/api/User/ChangePassowrd";

  if (isValid) {
    try {
      let response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Password was changed successfully!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          forgotPasswordPopup.style.display = "none";
          newPasswordPopup.style.display = "none";
        });
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP!",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      window.location.href = "404.html";
    }
  }
}
