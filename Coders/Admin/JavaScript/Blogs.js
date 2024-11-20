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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetBlogsCategory() {
  let url = `https://localhost:44313/api/Blog/GetAllCategory`;

  let request = await fetch(url);
  let data = await request.json();

  var blogsCategory = document.getElementById("blogsCategory");

  blogsCategory.innerHTML = `<option value="0" selected>All Blogs</option>`;

  data.forEach((category) => {
    blogsCategory.innerHTML += `
          <option value="${category.categoryId}">${category.categoryName}</option>`;
  });
}

GetBlogsCategory();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function StoreBlogId(blogId) {
  localStorage.BlogId = blogId;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetBlogs() {
  var blogsCategory = document.getElementById("blogsCategory").value;

  let url = `https://localhost:44313/api/Blog/GetBlogsByCategoryId/${blogsCategory}`;

  var allBlogsContanier = document.getElementById("allBlogsContanier");

  allBlogsContanier.innerHTML = "";

  let request = await fetch(url);
  let data = await request.json();

  data.forEach((blog) => {
    allBlogsContanier.innerHTML += `
          <li class="list-group-item forum-thread">
            <div class="media align-items-center">
              <div class="media-left">
                <div class="forum-icon-wrapper">
                  <img
                    src="/images/${blog.firstImage}"
                    alt="${blog.firstImage}"
                    width="75"
                    height="75"
                  />
                </div>
              </div>
              <div class="media-body">
                <div class="d-flex justify-content-between align-items-center">
                  <a href="Blog-Details.html" onclick = "StoreBlogId(${blog.blogId})" class="text-body">
                    <strong>${blog.name}</strong> 
                  </a>
                </div>
              </div>
            </div>
          </li>`;
  });
}

GetBlogs();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetBlogDetails() {
  var BlogId = localStorage.getItem("BlogId");

  let url = `https://localhost:44313/api/Blog/GetBlogById/${BlogId}`;

  try {
    let request = await fetch(url);
    let data = await request.json();

    document.getElementsByName("name")[0].value = data.name;
    document.getElementsByName("Category")[0].value =
      data.category.categoryName;
    document.getElementsByName("mainTitle")[0].value = data.mainTitle;
    document.getElementsByName("firstParaghraph")[0].value =
      data.firstParaghraph;
    document.getElementsByName("secondParaghraph")[0].value =
      data.secondParaghraph;
    document.getElementsByName("subTitle")[0].value = data.subTitle;
    document.getElementsByName("thirdParaghraph")[0].value =
      data.thirdParaghraph;
    document.getElementsByName("auther")[0].value = data.auther;
    document.getElementsByName("dateOfPost")[0].value = new Date(
      data.dateOfPost
    ).toLocaleDateString();
    document.getElementById("firstImage").src = `/Images/${data.firstImage}`;
    document.getElementById("secondImage").src = `/Images/${data.secondImage}`;
  } catch (error) {
    console.error("Error fetching blog details:", error);
  }
}

GetBlogDetails();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function UpdateBlogDetails(event) {
  event.preventDefault();
  var BlogId = localStorage.getItem("BlogId");
  const url = `https://localhost:44313/api/Blog/UpdateBlogDetails/${BlogId}`;

  var form = document.getElementById("UpdateBlogForm");
  var formData = new FormData(form);

  let response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    showSuccessToast();

    setTimeout(() => {
      location.reload();
    }, 2000);
  } else {
    console.error("Failed to update instructor info:", response.status);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function DeleteBlog() {
  var BlogId = localStorage.getItem("BlogId");

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this blog?",
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
          `https://localhost:44313/api/Blog/DeleteBlog/${BlogId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          location.href = "All-Blogs.html";
        }
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function DeleteComment(commentId) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this comment?",
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
          `https://localhost:44313/api/Blog/DeleteComment/${commentId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          location.reload();
        }
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function GetComments() {
  var BlogId = localStorage.getItem("BlogId");

  let url = `https://localhost:44313/api/Blog/GetCommentsByBlogId/${BlogId}`;

  let request = await fetch(url);
  let data = await request.json();

  commentsContainer = document.getElementById("commentsContainer");

  data.forEach((comment) => {
    commentsContainer.innerHTML += `

           <li class="list-group-item">
                        <div class="media border rounded p-3 bg-light">
                          
                          <div class="media-body">
                            <div class="d-flex align-items-center">
                              <a
                                href="instructor-profile.html"
                                class="text-body"
                                ><strong>${comment.name}</strong></a
                              >
                              <small class="ml-auto text-muted"
                                >${comment.dateOfComment.split("T")[0]}
                              </small
                              >
                             <span class="ml-3 text-danger delete-comment" style="cursor: pointer;" onclick="DeleteComment(${
                               comment.commentId
                             })">X</span>

                            </div>
                            <p class="mt-1 mb-0 text-black-70">
                              ${comment.comment}
                            </p>
                          </div>
                        </div>
                      </li>
    `;
  });
}

GetComments();
