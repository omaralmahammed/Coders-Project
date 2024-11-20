/** @format */

// Login-With-Google.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv5vCoLdqubm_IJAOjNlgF7o9zo-1-VfE",
  authDomain: "login-3e8e4.firebaseapp.com",
  projectId: "login-3e8e4",
  storageBucket: "login-3e8e4.appspot.com",
  messagingSenderId: "251369161445",
  appId: "1:251369161445:web:ef0c157a6b0cdcdb1a0a0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

// Get the Google login button element
const googleLogin = document.getElementById("google-login-btn");

if (googleLogin) {
  googleLogin.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const { uid, displayName, email, photoURL } = user;

      const userData = {
        Email: email,
        Password: uid,
      };

      // Send user data to the API
      const response = await fetch("https://localhost:44313/api/User/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(userData).toString(),
      });
      if (response.ok) {
        let data = await response.json();

        localStorage.setItem("Token", data.token);
        localStorage.setItem("UserId", data.userId);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
          timer: 1500,
          showConfirmButton: false,
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
  });
} else {
  console.error("Login button not found");
}
