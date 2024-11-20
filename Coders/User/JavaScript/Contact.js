/** @format */

async function ContactRequst() {
  event.preventDefault();
  try {
    var url = "https://localhost:44313/api/Contact/ContactRequest";
    var form = document.getElementById("ContatForm");
    var formData = new FormData(form);

    let response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      Swal.fire({
        title:
          "Thank you for contacting us! We will get back to you as soon as possible.",
        text: "Support Team",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => window.location.reload(), 3000);
    }
  } catch (error) {
    console.error("Error during contact:", error);
    window.location.href = "404.html";
  }
}
