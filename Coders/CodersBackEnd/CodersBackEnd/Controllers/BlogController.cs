using CodersBackEnd.DTO;
using CodersBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Reflection.Metadata;
using System.Security.Policy;

namespace CodersBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly MyDbContext _db;

        public BlogController(MyDbContext db) 
        {
            _db = db;
        }


        [HttpGet("GetAllCategory")]
        public IActionResult GetAllCategories()
        {
            var categories = _db.BlogCategories.ToList();

            return Ok(categories);
        }

        [HttpGet("GetRecentPost/{num}")]
        public IActionResult GetRecentPost(int num)
        {
            var recentBlogs = _db.Blogs
                   .OrderByDescending(b => b.DateOfPost)
                   .Take(num)
                   .ToList();

            return Ok(recentBlogs);
        }

        [HttpGet("GetBlogsByCategoryId/{categoryId}")]
        public IActionResult GetBlogsByCategoryId(int categoryId)
        {
            var blogs = _db.Blogs.ToList();

            if (categoryId == 0)
            {
                blogs = _db.Blogs.ToList();
            }
            else
            {

                blogs = _db.Blogs.Where(c => c.CategoryId == categoryId).ToList();

            }

            return Ok(blogs);
        }

        [HttpGet("GetBlogById/{blogId}")]
        public IActionResult GetBlogById(int blogId)
        {
            var blog = _db.Blogs.Include(c => c.Category).Where(b => b.BlogId == blogId).FirstOrDefault();

            return Ok(blog);
        }

        [HttpPost("AddBlog")]
        public IActionResult AddBlog([FromForm] BlogRequestDTO blogInfo)
        {
            if (blogInfo == null)
            {
                return BadRequest("Blog information is missing.");
            }

            var imageFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Images";

            if (blogInfo.FirstImage != null && blogInfo.FirstImage.Length > 0)
            {
                var firstImagePath = Path.Combine(imageFolder, blogInfo.FirstImage.FileName);

                if (!System.IO.File.Exists(firstImagePath))
                {
                    using (var stream = new FileStream(firstImagePath, FileMode.Create))
                    {
                        blogInfo.FirstImage.CopyTo(stream);
                    }
                }
            }

            if (blogInfo.SecondImage != null && blogInfo.SecondImage.Length > 0)
            {
                var secondImagePath = Path.Combine(imageFolder, blogInfo.SecondImage.FileName);

                if (!System.IO.File.Exists(secondImagePath))
                {
                    using (var stream = new FileStream(secondImagePath, FileMode.Create))
                    {
                        blogInfo.SecondImage.CopyTo(stream);
                    }
                }
            }

            Blog newBlog = new Blog()
            {
                Name = blogInfo.Name,
                MainTitle = blogInfo.MainTitle,
                FirstParaghraph = blogInfo.FirstParaghraph,
                SecondParaghraph = blogInfo.SecondParaghraph,
                SubTitle = blogInfo.SubTitle,
                ThirdParaghraph = blogInfo.ThirdParaghraph,
                Auther = blogInfo.Auther,
                DateOfPost = DateTime.Now,
                Status = "Published",
                CategoryId = blogInfo.CategoryId,
                FirstImage = blogInfo.FirstImage?.FileName,
                SecondImage = blogInfo.SecondImage?.FileName
            };

            // Save the blog to the database
            _db.Blogs.Add(newBlog);
            _db.SaveChanges();

            return Ok(newBlog);
        }


        [HttpDelete("DeleteBlog/{blogId}")]
        public IActionResult DeleteBlog(int blogId)
        {

            var blog = _db.Blogs.Find(blogId);

            _db.Blogs.Remove(blog);
            _db.SaveChanges();

            return Ok();
        }
      
        [HttpPut("UpdateBlogDetails/{blogId}")]
        public IActionResult UpdateBlogDetails([FromForm] BlogRequestDTO blogDetails, int blogId)
        {
            var blog = _db.Blogs.Find(blogId);

            if (blog == null)
            {
                return NotFound("Blog not found");
            }

            blog.Name =  blogDetails.Name ?? blog.Name;
            blog.MainTitle =  blogDetails.MainTitle ?? blog.MainTitle;
            blog.FirstParaghraph =  blogDetails.FirstParaghraph ?? blog.FirstParaghraph;
            blog.SecondParaghraph =  blogDetails.SecondParaghraph ?? blog.SecondParaghraph;
            blog.SubTitle =  blogDetails.SubTitle ?? blog.SubTitle;
            blog.ThirdParaghraph =  blogDetails.ThirdParaghraph ?? blog.ThirdParaghraph;
            blog.Auther =   blogDetails.Auther ?? blog.Auther;
            blog.DateOfPost = blogDetails.DateOfPost ?? blog.DateOfPost;
            blog.Status =   blogDetails.Status ?? blog.Status;

            if (blogDetails.FirstImage != null && blogDetails.FirstImage.Length > 0)
            {
                var imageFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Images";
                var firstImagePath = Path.Combine(imageFolder, blogDetails.FirstImage.FileName);

                if (!System.IO.File.Exists(firstImagePath))
                {
                    using (var stream = new FileStream(firstImagePath, FileMode.Create))
                    {
                        blogDetails.FirstImage.CopyTo(stream);
                    }
                }

                blog.FirstImage = blogDetails.FirstImage.FileName ?? blog.FirstImage;
            }


            if (blogDetails.SecondImage != null && blogDetails.SecondImage.Length > 0)
            {
                var imageFolder = "C:\\Users\\Orange\\Desktop\\Coders\\Images";
                var secondImagePath = Path.Combine(imageFolder, blogDetails.SecondImage.FileName);

                if (!System.IO.File.Exists(secondImagePath))
                {
                    using (var stream = new FileStream(secondImagePath, FileMode.Create))
                    {
                        blogDetails.SecondImage.CopyTo(stream);
                    }
                }

                blog.SecondImage = blogDetails.SecondImage.FileName ?? blog.SecondImage;
            }

            _db.Blogs.Update(blog);
            _db.SaveChanges();

            return Ok(blog);
        }

        [HttpGet("GetCommentByBlogId/{blogId}")]
        public IActionResult GetCommentByBlogId(int blogId)
        {
            var comments = _db.BlogComments.Where(b => b.BlogId == blogId).ToList();

            return Ok(comments);
        }

        [HttpGet("GetCommentsByBlogId/{blogId}")]
        public IActionResult GetCommentsByBlogId(int blogId) { 
        
            var comments = _db.BlogComments.Where(b => b.BlogId == blogId).ToList();
        
            return Ok(comments);
        }

        [HttpPost("AddCommentForBlog/{blogId}")]
        public IActionResult AddCommentForBlog([FromBody] BlogCommentDTO comment, int blogId)
        {
            BlogComment newComment = new BlogComment
            {
                Name = comment.Name,
                Email = comment.Email,
                Comment = comment.Comment,
                DateOfComment = DateTime.Now,
                Status = "Pending",
                BlogId = blogId
            };

            _db.BlogComments.Add(newComment);
            _db.SaveChanges();

            return Ok(newComment);
        }

        [HttpDelete("DeleteComment/{commentId}")]
        public IActionResult DeleteComment(int commentId)
        {

            var comment = _db.BlogComments.Find(commentId);

            _db.BlogComments.Remove(comment);
            _db.SaveChanges();

            return Ok();
        }

    }
}
