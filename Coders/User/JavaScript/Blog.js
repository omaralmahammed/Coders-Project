/** @format */

function storeCategoryId(categoryId) {
  localStorage.CategoryId = categoryId;
  window.location = "blog-sidebar.html";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function fetchCategoryNames(containerId) {
  const url = "https://localhost:44313/api/Blog/GetAllCategory";

  const response = await fetch(url);
  const data = await response.json();

  const categoriesContainer = document.getElementById(containerId);
  categoriesContainer.innerHTML = "";

  data.forEach((category) => {
    categoriesContainer.innerHTML += `
        <div class="it-sv-details-sidebar-category mb-10" onclick="fetchBlogs(${category.categoryId})">
          ${category.categoryName} <span><i class="fa-light fa-angle-right"></i></span>
        </div>
      `;
  });
}

fetchCategoryNames("categoriesCountener1");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function fetchCategoryNamesInBlogDetails(containerId) {
  const url = "https://localhost:44313/api/Blog/GetAllCategory";

  const response = await fetch(url);
  const data = await response.json();

  const categoriesContainer = document.getElementById(containerId);
  categoriesContainer.innerHTML = "";

  data.forEach((category) => {
    categoriesContainer.innerHTML += `
        <div class="it-sv-details-sidebar-category mb-10" onclick="storeCategoryId(${category.categoryId})">
          ${category.categoryName} <span><i class="fa-light fa-angle-right"></i></span>
        </div>
      `;
  });
}
fetchCategoryNamesInBlogDetails("categoriesCountener2");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function fetchRecentPosts(containerId) {
  const url = "https://localhost:44313/api/Blog/GetRecentPost/5";

  const response = await fetch(url);
  const data = await response.json();

  const recentPostContainer = document.getElementById(containerId);
  recentPostContainer.innerHTML = "";

  data.forEach((blog) => {
    recentPostContainer.innerHTML += `
        <div class="sidebar__widget-content">
          <div class="sidebar__post">
            <div class="rc__post mb-30 d-flex align-items-start">
              <div class="rc__post-thumb mr-20">
                <button type="button" onclick="storeBlogId(${blog.blogId})">
                  <img src="/Images/${
                    blog.firstImage
                  }" alt="" width="80px" height="80px" />
                </button>
              </div>
              <div class="rc__post-content">
                <div class="rc__meta">
                  <span><i class="fa-solid fa-calendar-days"></i>${
                    blog.dateOfPost.split("T")[0]
                  }</span>
                </div>
                <h3 class="rc__post-title">
                  <button type="button" onclick="storeBlogId(${blog.blogId})">${
      blog.name
    }</button>
                </h3>
              </div>
            </div>
          </div>
        </div>
      `;
  });
}

fetchRecentPosts("recentPostCountener1");
fetchRecentPosts("recentPostCountener2");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function fetchBlogs(categoryId = localStorage.getItem("CategoryId")) {
  const url = `https://localhost:44313/api/Blog/GetBlogsByCategoryId/${categoryId}`;
  const blogContainer = document.getElementById("blogCountener");

  const response = await fetch(url);
  const data = await response.json();

  blogContainer.innerHTML = ""; // Clear previous content

  data.forEach((blog) => {
    blogContainer.innerHTML += `
      <div class="postbox__thumb-box mb-80">
        <div class="postbox__main-thumb mb-30">
          <img src="/Images/${blog.firstImage}" alt="" />
        </div>
        <div class="postbox__content-box">
          <div class="postbox__meta">
            <span><i class="fa-light fa-calendar-days"></i>${
              blog.dateOfPost.split("T")[0]
            }</span>
            <span><i class="fal fa-user"></i>${blog.auther}</span>
          </div>
          <h4 class="text-left">
            <button type="button" onclick="storeBlogId(${blog.blogId})">${
      blog.name
    }</button>
          </h4>
          <button type="button" onclick="storeBlogId(${
            blog.blogId
          })" class="it-btn mt-15">
            <span>Read more
              <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1.24023L16 7.24023L11 13.2402" stroke="currentcolor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1 7.24023H16" stroke="currentcolor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    `;
  });
}

fetchBlogs(1);

/////////////////////////////////////////////////////////////////////////////////////
async function storeBlogId(blogId) {
  localStorage.BlogId = blogId;

  window.location.href = "blog-details.html";
}

////////////////////////////////////////////////////////////////////////////////////////////

async function GetBlogDetails() {
  var BlogId = localStorage.getItem("BlogId");
  var url = `https://localhost:44313/api/Blog/GetBlogById/${BlogId}`;

  var detailsContainer = document.getElementById("detailsContainer");

  let request = await fetch(url);
  let data = await request.json();

  detailsContainer.innerHTML = `
  
     <div class="postbox__details-title-box pb-40">
                    <div class="postbox__meta">
                      <span
                        ><i class="fa-solid fa-calendar-days"></i>${
                          data.dateOfPost.split("T")[0]
                        }</span
                      >
                      <span
                        ><i class="fa-regular fa-comments"></i>Write by:  ${
                          data.auther
                        }</span
                      >
                      <span class="commentNum"
                        ><i class="fa-regular fa-comments"></i>Comment
                        (06)</span
                      >
                    </div>
                    <h4 class="postbox__title mb-20">
                     ${data.mainTitle}
                    </h4>
                    <p>
                      ${data.firstParaghraph}
                    </p>
                    <p>
                       ${data.secondParaghraph}
                    </p>
                   
                  </div>

                  <div class="postbox__content pb-20">
                    <div
                      class="postbox__content-img mb-40 d-flex justify-content-between"
                    >
                      <img
                        class="mr-30"
                        src="/Images/${data.firstImage}"
                        alt=""
                        width="250px"
                        height="250px"
                      />
                      <img
                        src="/Images/${data.secondImage}"
                        alt=""
                        width="250px"
                        height="250px"
                      />
                    </div>
                    <div class="postbox__text">
                      <h4 class="postbox__details-title">
                        ${data.subTitle}
                      </h4>
                      <p>
                        ${data.thirdParaghraph}
                      </p>
                    </div>
                  </div>
  
      `;
}

GetBlogDetails();

////////////////////////////////////////////////////////////////////////////////////////////

var CommentNumber = 0;
async function GetAllComments() {
  var BlogId = localStorage.getItem("BlogId");
  let url = `https://localhost:44313/api/Blog/GetCommentByBlogId/${BlogId}`;

  let request = await fetch(url);
  let data = await request.json();

  commentContainer = document.getElementById("commentContainer");

  data.forEach((comment) => {
    CommentNumber++;

    commentContainer.innerHTML += `
  
      <li class="comment-item">
                          <div class="comment-box d-flex align-items-center">
                            <div class="comment-avatar">
                              <img src="/Images/default.jpg" alt="" />
                            </div>
                            <div class="comment-content">
                              <div class="comment-meta d-flex justify-content-between">
                                <span class="comment-author">${
                                  comment.name
                                }</span>
                                <span class="comment-date">${
                                  comment.dateOfComment.split("T")[0]
                                } ${
      comment.dateOfComment.split("T")[1].split(":")[0]
    }:${comment.dateOfComment.split("T")[1].split(":")[1]}</span>
                              </div>
                              <p class="comment-text">${comment.comment}</p>
                            </div>
                          </div>
      </li>
  
      `;
  });

  const commentElements = document.querySelectorAll(".commentNum");

  commentElements.forEach((element) => {
    element.innerHTML = `Comment (${CommentNumber})`;
  });
}

GetAllComments();

////////////////////////////////////////////////////////////////////////////////////////////

async function AddComment() {
  event.preventDefault();
  var BlogId = localStorage.getItem("BlogId");
  let url = `https://localhost:44313/api/Blog/AddCommentForBlog/${BlogId}`;

  var form = document.getElementById("addCommentForm");

  var commentData = {
    name: form.elements["name"].value,
    email: form.elements["email"].value,
    comment: form.elements["comment"].value,
  };

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: `Thanks ${commentData.name}, your comment was sent!`,
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Something went wrong. Please try again.",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
