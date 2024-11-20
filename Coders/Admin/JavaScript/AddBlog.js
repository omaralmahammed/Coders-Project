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

/////////////////////////////////////////////////////////////////////////////////////////////////

async function GetCategory() {
  let url = "https://localhost:44313/api/Blog/GetAllCategory";

  let request = await fetch(url);
  let data = await request.json();

  categoryList = document.getElementById("categoryList");

  data.forEach((category) => {
    categoryList.innerHTML += `
          <option value="${category.categoryId}">${category.categoryName}</option>`;
  });
}

GetCategory();
/////////////////////////////////////////////////////////////////////////////////////////////////

async function AdddBlog(event) {
  event.preventDefault();
  const url = `https://localhost:44313/api/Blog/AddBlog`;

  var form = document.getElementById("UpdateBlogForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();

    setTimeout(() => {
      location.href = "All-Blogs.html";
    }, 2000);
  } else {
    console.error("Failed to update instructor info:", response.status);
  }
}
