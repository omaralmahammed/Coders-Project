using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CodersBackEnd.Models;

public partial class MyDbContext : DbContext
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<AssignmentSubmition> AssignmentSubmitions { get; set; }

    public virtual DbSet<BillingDetail> BillingDetails { get; set; }

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<BlogCategory> BlogCategories { get; set; }

    public virtual DbSet<BlogComment> BlogComments { get; set; }

    public virtual DbSet<ChatMessage> ChatMessages { get; set; }

    public virtual DbSet<ChatRoom> ChatRooms { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Content> Contents { get; set; }

    public virtual DbSet<Instructor> Instructors { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Program> Programs { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<Technology> Technologies { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-2LAAQSG;Database=CodersDb;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.HasKey(e => e.AssignmentId).HasName("PK__Assignme__32499E7746686DCA");

            entity.ToTable("Assignment");

            entity.Property(e => e.AssignmentName).IsUnicode(false);
            entity.Property(e => e.AssignmentTitle).IsUnicode(false);
            entity.Property(e => e.DeadTime).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.ProgramId).HasColumnName("ProgramID");

            entity.HasOne(d => d.Program).WithMany(p => p.Assignments)
                .HasForeignKey(d => d.ProgramId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Program_Assignment");
        });

        modelBuilder.Entity<AssignmentSubmition>(entity =>
        {
            entity.HasKey(e => e.AssignmentSubmitionId).HasName("PK__Assignme__216C7A7017387F30");

            entity.ToTable("AssignmentSubmition");

            entity.Property(e => e.AssignmentId).HasColumnName("AssignmentID");
            entity.Property(e => e.DateOfSubmition).HasColumnType("datetime");
            entity.Property(e => e.Feedback)
                .IsUnicode(false)
                .HasColumnName("feedback");
            entity.Property(e => e.ProgramId).HasColumnName("ProgramID");
            entity.Property(e => e.Solution).IsUnicode(false);
            entity.Property(e => e.StudentId).HasColumnName("StudentID");

            entity.HasOne(d => d.Assignment).WithMany(p => p.AssignmentSubmitions)
                .HasForeignKey(d => d.AssignmentId)
                .HasConstraintName("FK_Assignment_AssignmentSubmition");

            entity.HasOne(d => d.Program).WithMany(p => p.AssignmentSubmitions)
                .HasForeignKey(d => d.ProgramId)
                .HasConstraintName("FK_Program_AssignmentSubmition");

            entity.HasOne(d => d.Student).WithMany(p => p.AssignmentSubmitions)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Student_AssignmentSubmition");
        });

        modelBuilder.Entity<BillingDetail>(entity =>
        {
            entity.HasKey(e => e.BillingId).HasName("PK__BillingD__F1656DF3399BE243");

            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.City).HasMaxLength(255);
            entity.Property(e => e.County).HasMaxLength(100);
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.Postcode).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.BillingDetails)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_User_Billin");
        });

        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.BlogId).HasName("PK__Blog__54379E30F759626B");

            entity.ToTable("Blog");

            entity.Property(e => e.Auther).IsUnicode(false);
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.DateOfPost).HasColumnType("datetime");
            entity.Property(e => e.FirstImage).IsUnicode(false);
            entity.Property(e => e.SecondImage).IsUnicode(false);

            entity.HasOne(d => d.Category).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Blog_Category");
        });

        modelBuilder.Entity<BlogCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__BlogCate__19093A0B8A3AB611");

            entity.ToTable("BlogCategory");
        });

        modelBuilder.Entity<BlogComment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PK__BlogComm__C3B4DFCACC3514D6");

            entity.ToTable("BlogComment");

            entity.Property(e => e.BlogId).HasColumnName("BlogID");
            entity.Property(e => e.DateOfComment).HasColumnType("datetime");

            entity.HasOne(d => d.Blog).WithMany(p => p.BlogComments)
                .HasForeignKey(d => d.BlogId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Blog");
        });

        modelBuilder.Entity<ChatMessage>(entity =>
        {
            entity.HasKey(e => e.ChatMessageId).HasName("PK__ChatMess__9AB610354B66C58A");

            entity.Property(e => e.SentAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status)
                .IsUnicode(false)
                .HasColumnName("status");
        });

        modelBuilder.Entity<ChatRoom>(entity =>
        {
            entity.HasKey(e => e.ChatRoomId).HasName("PK__ChatRoom__69733CF78F7CC8CC");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NotificationNumber).HasColumnName("notificationNumber");
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Contact__3214EC07475C3566");

            entity.ToTable("Contact");

            entity.Property(e => e.RequestDate).HasColumnType("datetime");
            entity.Property(e => e.RsponseDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Content>(entity =>
        {
            entity.HasKey(e => e.ContentId).HasName("PK__Content__2907A81E99E018F6");

            entity.ToTable("Content");

            entity.Property(e => e.ContentDetails).IsUnicode(false);
            entity.Property(e => e.ContentTypes).IsUnicode(false);
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

            entity.HasOne(d => d.Subject).WithMany(p => p.Contents)
                .HasForeignKey(d => d.SubjectId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Subject_Content");
        });

        modelBuilder.Entity<Instructor>(entity =>
        {
            entity.HasKey(e => e.InstructorId).HasName("PK__Instruct__9D010A9B822BCA69");

            entity.ToTable("Instructor");

            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.Education).IsUnicode(false);
            entity.Property(e => e.Email).IsUnicode(false);
            entity.Property(e => e.FirstName).IsUnicode(false);
            entity.Property(e => e.Image).IsUnicode(false);
            entity.Property(e => e.LinkInProfile).IsUnicode(false);
            entity.Property(e => e.ProgramId).HasColumnName("ProgramID");
            entity.Property(e => e.SecondName).IsUnicode(false);

            entity.HasOne(d => d.Program).WithMany(p => p.Instructors)
                .HasForeignKey(d => d.ProgramId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Program_Instructor");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A382A894E7D");

            entity.ToTable("Payment");

            entity.Property(e => e.Amount).IsUnicode(false);
            entity.Property(e => e.PaymentDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).IsUnicode(false);
            entity.Property(e => e.PaymentStatus).IsUnicode(false);
            entity.Property(e => e.ProgramId).HasColumnName("ProgramID");
            entity.Property(e => e.TransactionId).IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Program).WithMany(p => p.Payments)
                .HasForeignKey(d => d.ProgramId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Program_Payment");

            entity.HasOne(d => d.User).WithMany(p => p.Payments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_User_Payment");
        });

        modelBuilder.Entity<Program>(entity =>
        {
            entity.HasKey(e => e.ProgramId).HasName("PK__Program__75256058690CA712");

            entity.ToTable("Program");

            entity.Property(e => e.Category).IsUnicode(false);
            entity.Property(e => e.Curriculum).IsUnicode(false);
            entity.Property(e => e.DateOfStart).HasColumnType("datetime");
            entity.Property(e => e.Description1).IsUnicode(false);
            entity.Property(e => e.Description2).IsUnicode(false);
            entity.Property(e => e.Image).IsUnicode(false);
            entity.Property(e => e.Name).IsUnicode(false);
            entity.Property(e => e.PeriodTime).IsUnicode(false);
            entity.Property(e => e.Price).IsUnicode(false);
            entity.Property(e => e.Title).IsUnicode(false);
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__Service__C51BB00AE75F3C8B");

            entity.ToTable("Service");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__Student__32C52B994768F5C9");

            entity.ToTable("Student");

            entity.Property(e => e.ProgramId).HasColumnName("ProgramID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Program).WithMany(p => p.Students)
                .HasForeignKey(d => d.ProgramId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Program_Student");

            entity.HasOne(d => d.User).WithMany(p => p.Students)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_User_Student");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subject__AC1BA3A8DE0364DF");

            entity.ToTable("Subject");

            entity.Property(e => e.SubjectName).IsUnicode(false);
            entity.Property(e => e.TechnologyId).HasColumnName("TechnologyID");

            entity.HasOne(d => d.Technology).WithMany(p => p.Subjects)
                .HasForeignKey(d => d.TechnologyId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Subject_Technology");
        });

        modelBuilder.Entity<Technology>(entity =>
        {
            entity.HasKey(e => e.TechnologyId).HasName("PK__Technolo__7057015858516297");

            entity.ToTable("Technology");

            entity.Property(e => e.ProgramId).HasColumnName("ProgramID");
            entity.Property(e => e.TechnologyName).IsUnicode(false);

            entity.HasOne(d => d.Program).WithMany(p => p.Technologies)
                .HasForeignKey(d => d.ProgramId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Program_Technology");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C73CAC4FC");

            entity.Property(e => e.Otp).HasColumnName("OTP");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
