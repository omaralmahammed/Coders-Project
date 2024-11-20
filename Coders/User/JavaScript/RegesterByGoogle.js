/** @format */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAv5vCoLdqubm_IJAOjNlgF7o9zo-1-VfE",
  authDomain: "login-3e8e4.firebaseapp.com",
  projectId: "login-3e8e4",
  storageBucket: "login-3e8e4.appspot.com",
  messagingSenderId: "251369161445",
  appId: "1:251369161445:web:ef0c157a6b0cdcdb1a0a0c",
};

// Initialize Firebase app and authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set the language code for authentication messages
auth.languageCode = "en";

// Create a new instance of GoogleAuthProvider for Google sign-in
const provider = new GoogleAuthProvider();

// Get the login button element from the DOM
const googleLogin = document.getElementById("google-login-btn");

// Check if the button exists before attaching the event listener
if (googleLogin) {
  googleLogin.addEventListener("click", async function () {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { uid, displayName, email, photoURL } = user;
      const [firstName, lastName] = displayName
        ? displayName.split(" ")
        : ["", ""];

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid,
          displayName,
          email,
          photoURL,
        })
      );

      const userData = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: uid,
        ConfirmPassword: uid,
      };

      const url = "https://localhost:44313/api/User/Register";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(userData).toString(),
      });

      // Check if the response is OK (HTTP status 200)
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `Welcome ${displayName}`,
          text: "Please Log in By Google",
          timer: 1800,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "signin.html";
        });
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
  });
}
