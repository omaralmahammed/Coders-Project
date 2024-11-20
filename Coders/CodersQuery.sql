Create database CoderDb;

USE CodersDb;
GO

CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(MAX) NULL,
    LastName NVARCHAR(MAX) NULL,
    Email NVARCHAR(MAX) NULL,

    Password NVARCHAR(MAX) NULL,

    PasswordHash VARBINARY(MAX) NULL,
    PasswordSalt VARBINARY(MAX) NULL,

	OTP NVARCHAR(MAX) NULL,

    DateOfBirth DATETIME2(7) NULL,

    Gender NVARCHAR(MAX) NULL,
    Country NVARCHAR(MAX) NULL,
    City NVARCHAR(MAX) NULL,
    Postcode NVARCHAR(MAX) NULL,
    PhoneNumber NVARCHAR(MAX) NULL,
    Image NVARCHAR(MAX) NULL
);

CREATE TABLE Service (
    ServiceId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(MAX) NULL,
	Brief NVARCHAR(MAX) NULL,
    Description NVARCHAR(MAX) NULL,
);

INSERT INTO Service (Name, Brief, Description) 
VALUES 
-- Active Learning
(
    'Active Learning', 
    'Hands-on learning with real-world projects and interactive coding sessions.', 
    'Experience hands-on learning with real-world projects and interactive coding sessions. Build your skills in web and mobile development while collaborating with peers in a dynamic, practical environment. Engage with real-world scenarios to gain confidence and apply your knowledge effectively in both personal and collaborative projects. This method ensures that you not only gain technical proficiency but also develop the ability to think critically and solve complex problems. 

    By integrating theory with practice, Active Learning bridges the gap between academic concepts and real-world application. You’ll have the opportunity to work on projects that simulate professional environments, allowing you to gain practical experience that prepares you for the workforce.'
),
-- Expert Mentors
(
    'Expert Mentors', 
    'Guidance from experienced industry professionals.', 
    'Learn from experienced industry professionals who guide you through every step of your journey. Our expert mentors provide you with actionable advice, insights, and best practices tailored to your learning goals and challenges. Whether you’re navigating the complexities of web and mobile development or seeking guidance on career development, our mentors are there to help you stay on the right path. 

    These professionals bring years of experience from the industry and are committed to helping you overcome obstacles in your learning journey. Their practical knowledge is invaluable in helping you grow both technically and professionally.'
),
-- Strategic Curriculum
(
    'Strategic Curriculum', 
    'Carefully designed curriculum to meet industry demands.', 
    'Our curriculum is carefully designed to meet the latest demands in the technology sector. It emphasizes relevant, high-demand skills that will enable you to stay competitive in a fast-paced industry. With an updated curriculum, we ensure that you are learning the most current technologies and methodologies used in today’s market. 

    Each module is crafted to provide a solid foundation in core areas of web and mobile development, with the flexibility to dive deeper into advanced topics as you progress. This strategic approach ensures that you are well-prepared to meet the challenges of modern development roles.'
),
-- Smart Test
(
    'Smart Test', 
    'Proficiency measurement and feedback.', 
    'Our smart test measures your proficiency in web and mobile development, offering a comprehensive evaluation of your strengths and areas that need improvement. This instant feedback is designed to help you better understand where you stand and what you need to focus on to further develop your skills. 

    The test covers various aspects of development, providing a complete overview of your capabilities. With this feedback, you can identify knowledge gaps and work on areas that need refinement, ensuring consistent progress.'
),
-- Daily Tasks
(
    'Daily Tasks', 
    'Daily challenges for continuous progress.', 
    'Strengthen your skills through daily challenges that simulate real-world development scenarios. These tasks are carefully designed to mirror the complexities of modern web and mobile projects, offering you continuous opportunities to practice and apply what you’ve learned. The challenges are both fun and engaging, keeping you motivated throughout your learning process. 

    Daily tasks help you solidify your understanding, allowing you to gradually build up your skill set. This approach ensures that learning is not just a one-time event but a continuous and dynamic experience.'
),
-- Flexible Learning Paths
(
    'Flexible Learning Paths', 
    'Choose learning paths tailored to your goals.', 
    'We offer flexible learning paths tailored to your individual career goals, whether youre aiming to become a front-end developer, back-end developer, full-stack engineer, or mobile app creator. Our learning paths are structured to provide a logical progression from foundational topics to advanced expertise, making it easy for you to stay focused and achieve your objectives. 

    With a wide range of resources available, you can adapt your learning experience to fit your schedule and goals. This flexibility empowers you to take control of your education and advance at your own pace.'
);


CREATE TABLE Contact (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(MAX),
    Email NVARCHAR(MAX),
	PhoneNumber NVARCHAR(MAX),
    Subject NVARCHAR(MAX),
    Message NVARCHAR(MAX),
    RequestDate DATETIME,
    AdminName NVARCHAR(MAX),
    AdminResponse NVARCHAR(MAX),
    RsponseDate DATETime,
    Status NVARCHAR(MAX)
);


CREATE TABLE BlogCategory (
	CategoryId INT PRIMARY KEY IDENTITY(1,1),
	CategoryName NVARCHAR(MAX),
    CategoryImage NVARCHAR(MAX) 
);


CREATE TABLE Blog (
	BlogId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(MAX),
    MainTitle NVARCHAR(MAX),
	FirstParaghraph  NVARCHAR(MAX),
	SecondParaghraph NVARCHAR(MAX),
    SubTitle NVARCHAR(MAX),
    ThirdParaghraph NVARCHAR(MAX),
    FirstImage  VARCHAR(MAX),
    SecondImage VARCHAR(MAX),
	Auther VARCHAR(MAX),
    DateOfPost DATETIME,
    Status NVARCHAR(MAX),

	CategoryID INT,  
    CONSTRAINT FK_Blog_Category
        FOREIGN KEY (CategoryID) 
        REFERENCES BlogCategory(CategoryID)
        ON DELETE CASCADE
);

INSERT INTO BlogCategory (CategoryName, CategoryImage)
VALUES 
    ('Web Development', 'web-development.jpg'),
    ('Mobile Development', 'mobile-development.jpg'),
    ('ChatGPT', 'chatgpt.jpg'),
    ('Programming Languages', 'programming-languages.jpg'),
    ('Developer Soft Skills', 'developer-softskills.jpg');

-- Insert 3 blogs for Web Development
INSERT INTO Blog (Name, MainTitle, FirstParaghraph, SecondParaghraph, SubTitle, ThirdParaghraph, FirstImage, SecondImage, Auther, DateOfPost, Status, CategoryID)
VALUES
    ('Introduction to Web Development', 
     'Getting Started with Web Development', 
     'Web development is a rapidly growing field that combines creativity and technical skills to build websites and web applications. The process of creating a website begins with understanding the client’s needs and objectives, followed by designing a user interface (UI) that is both functional and visually appealing. Once the design is set, developers work on the front end to structure the website using HTML, style it with CSS, and add interactivity with JavaScript. As businesses move online, having a web presence is no longer optional but essential for success in today’s digital world.', 
     'Web developers also need to consider the back-end technologies that handle data and server-side logic. This includes working with databases, managing APIs, and ensuring security. A well-built website must not only look good but also perform efficiently to ensure a smooth user experience. The demand for skilled web developers continues to grow, making it a lucrative and exciting career path. Whether you are building a simple personal blog or a complex web application, understanding the fundamentals of web development is essential.', 
     'Frontend vs Backend', 
     'In web development, there are two primary areas of focus: frontend and backend development. Frontend developers are responsible for everything the user sees and interacts with on the website, such as layout, navigation, and overall design. Backend developers, on the other hand, manage the server, database, and application logic. These two roles work together to ensure that the website not only looks good but also functions correctly. Full stack developers are skilled in both frontend and backend technologies, allowing them to manage an entire web project.', 
     'web1.jpg', 'web2.jpg', 'John Doe', GETDATE(), 'Published', 1),
    
    ('HTML & CSS Basics', 
     'Building Blocks of Web Pages', 
     'HTML (Hypertext Markup Language) and CSS (Cascading Style Sheets) form the foundation of web development. HTML is used to structure the content of a webpage, while CSS is responsible for styling and layout. Together, these two technologies allow developers to create visually appealing and organized websites. Every element on a webpage, such as text, images, and links, is defined using HTML tags. CSS enhances the appearance of these elements by adding colors, fonts, spacing, and other visual aspects. Without HTML and CSS, the web as we know it would not exist.', 
     'Mastering HTML and CSS is the first step for anyone interested in web development. While HTML5 has introduced new features for structuring web content, CSS3 has brought advanced styling capabilities, such as animations, transitions, and grid layouts. Responsive design, which ensures that websites look good on any screen size, also relies heavily on CSS. As you build your knowledge of these two essential technologies, you’ll be able to create websites that are not only functional but also visually impressive.', 
     'Styling with CSS', 
     'One of the most important features of CSS is its ability to separate content from presentation. This allows web developers to write clean, maintainable code by keeping the structure (HTML) and the style (CSS) separate. Advanced CSS techniques include using Flexbox and Grid for layout management, media queries for responsive design, and CSS variables to simplify large stylesheets. With these tools, developers can create sophisticated and adaptable web designs. Learning how to properly use CSS will significantly enhance the quality of your web projects.', 
     'htmlcss1.jpg', 'htmlcss2.jpg', 'Jane Doe', GETDATE(), 'Published', 1),

    ('Responsive Design', 
     'Creating Mobile-Friendly Websites', 
     'Responsive design is a crucial aspect of modern web development, ensuring that websites are accessible and functional across a wide range of devices, from desktop computers to smartphones. With more people accessing the internet via mobile devices than ever before, it is essential to create websites that adjust seamlessly to different screen sizes. Responsive design involves the use of flexible grid layouts, fluid images, and CSS media queries to create web pages that look good on any device. A responsive website automatically adjusts its layout and content to suit the user’s screen.', 
     'Creating a responsive website requires careful planning and testing. Developers must think about how the website will appear on different devices, ensuring that the user experience remains consistent. Tools like CSS Flexbox and Grid make it easier to build responsive layouts, while media queries allow developers to apply different styles depending on the screen size. By adopting responsive design principles, web developers can ensure that their sites reach the widest possible audience, providing a smooth experience on any device.', 
     'Media Queries', 
     'Media queries are a key feature of CSS that allow developers to apply styles based on specific conditions, such as the width of the browser window or the orientation of the device. This flexibility enables websites to look good on both small screens, like smartphones, and large displays, like desktop monitors. When combined with other responsive design techniques, media queries ensure that websites are adaptable and user-friendly. Learning how to use media queries effectively is an essential skill for any web developer working in today’s mobile-first world.', 
     'responsive1.jpg', 'responsive2.jpg', 'Alex Smith', GETDATE(), 'Published', 1);


	 -- Insert 3 blogs for ChatGPT
INSERT INTO Blog (Name, MainTitle, FirstParaghraph, SecondParaghraph, SubTitle, ThirdParaghraph, FirstImage, SecondImage, Auther, DateOfPost, Status, CategoryID)
VALUES
    ('Understanding ChatGPT', 
     'Introduction to AI Chatbots', 
     'ChatGPT, developed by OpenAI, is an advanced language model that uses artificial intelligence to generate human-like text based on user input. It operates on a model called GPT (Generative Pre-trained Transformer) and is capable of understanding and producing responses in natural language. ChatGPT has been trained on a vast amount of data, allowing it to perform a variety of tasks, from answering questions to generating conversational text. This makes it a powerful tool for applications such as customer support, content creation, and education.', 
     'One of the remarkable features of ChatGPT is its ability to learn from context, which enables it to provide relevant and coherent answers. Although it does not have personal experiences or consciousness, it can mimic conversation patterns effectively. Its applications range from casual conversation to highly specialized fields, like medical diagnosis or legal advice, depending on the context of the prompts given. However, like any AI system, it requires careful handling and understanding of its limitations.', 
     'Natural Language Processing', 
     'ChatGPT’s core strength lies in its use of Natural Language Processing (NLP) techniques, which allow it to understand and respond to text in a manner that is close to human conversation. NLP is a field of AI that focuses on the interaction between computers and human language. ChatGPT uses this technology to process vast amounts of text, recognize patterns, and generate relevant responses. The ability of ChatGPT to handle multiple languages and complex inquiries makes it a groundbreaking tool in AI-driven communication.', 
     'chatgpt1.jpg', 'chatgpt2.jpg', 'Sophia Miller', GETDATE(), 'Published', 3),
     
    ('Applications of ChatGPT', 
     'How ChatGPT is Revolutionizing AI', 
     'ChatGPT has a wide range of applications across various industries, proving its versatility and effectiveness in automating tasks and enhancing user experience. In customer service, for example, ChatGPT can be used to create intelligent chatbots that handle inquiries, provide support, and solve customer issues around the clock. This reduces the need for human operators, increases efficiency, and lowers operational costs. Beyond customer service, ChatGPT can be used for content generation, providing writers and marketers with suggestions for blog posts, articles, and social media updates.', 
     'Additionally, ChatGPT is being explored for its potential in education. By acting as a virtual tutor, it can assist students with their studies by answering questions, explaining concepts, and even providing feedback on assignments. In the healthcare industry, ChatGPT can help medical professionals by summarizing patient records, offering preliminary diagnoses, and assisting with research. As the technology continues to evolve, we are likely to see even more innovative uses of ChatGPT in various fields.', 
     'Future of AI', 
     'As artificial intelligence continues to advance, the future of AI-powered tools like ChatGPT looks bright. Innovations in machine learning and NLP will only improve the accuracy and reliability of models like ChatGPT, allowing them to perform even more complex tasks. However, the ethical considerations of using AI in decision-making, content creation, and communication are still being debated. The future will require a balance between leveraging AI’s capabilities while ensuring its responsible and fair use across industries.', 
     'chatgpt3.jpg', 'chatgpt4.jpg', 'Liam Johnson', GETDATE(), 'Published', 3),
     
    ('Limitations of ChatGPT', 
     'Challenges and Ethical Considerations', 
     'While ChatGPT is a powerful tool, it is important to recognize its limitations. One of the main challenges with ChatGPT is its reliance on pre-existing data, which means it can sometimes produce biased or inaccurate information. Since ChatGPT generates responses based on patterns it has learned, it does not possess the ability to fact-check or ensure that its answers are always correct. This can be particularly problematic in sensitive areas, such as legal advice or medical information, where accuracy is critical.', 
     'Another limitation is ChatGPT’s lack of true understanding. Although it can generate coherent text, it does not have consciousness, emotions, or a genuine understanding of the topics it discusses. As a result, its responses can sometimes be vague, irrelevant, or inappropriate, depending on the context of the input. Moreover, there are ethical concerns around using AI in decision-making processes, as it may reinforce biases present in the training data or provide oversimplified solutions to complex issues.', 
     'Ethical AI', 
     'The ethical implications of AI technologies like ChatGPT are a hot topic in the tech community. Issues such as data privacy, AI bias, and the potential for job displacement need to be addressed as AI becomes more integrated into everyday life. Developers and users must be mindful of these challenges and work towards solutions that ensure AI is used ethically and responsibly. Transparent and fair AI development practices are crucial for building public trust in AI tools, such as ChatGPT, that have the potential to influence society in profound ways.', 
     'chatgpt5.jpg', 'chatgpt6.jpg', 'Emma Thompson', GETDATE(), 'Published', 3);

CREATE TABLE BlogComment(
	CommentId INT PRIMARY KEY IDENTITY(1,1),
	Name NVARCHAR(MAX),
	Email NVARCHAR(MAX),
	Comment NVARCHAR(MAX),
	LikeNumber int,
	DateOfComment DATETIME, 
	Status NVARCHAR(MAX),

	BlogID INT,  
    CONSTRAINT FK_Blog
        FOREIGN KEY (BlogID) 
        REFERENCES Blog(BlogId)
        ON DELETE CASCADE

);

-- Comments for "Limitations of ChatGPT" (BlogID = 3)
INSERT INTO BlogComment (Name, Email, Comment, LikeNumber, DateOfComment, Status, BlogID)
VALUES
    ('Alice Johnson', 'alice.johnson@example.com', 
     'Great insights on the limitations! It’s crucial to address these issues in AI development.', 
     5, GETDATE(), 'Approved', 3),
    ('Brian Smith', 'brian.smith@example.com', 
     'I appreciate the focus on ethical considerations. Very important in today"s context.', 
     3, GETDATE(), 'Approved', 3),
    ('Catherine Lee', 'catherine.lee@example.com', 
     'The discussion about data bias was particularly enlightening. Thank you for sharing!', 
     4, GETDATE(), 'Approved', 3);

-- Comments for "Applications of ChatGPT" (BlogID = 2)
INSERT INTO BlogComment (Name, Email, Comment, LikeNumber, DateOfComment, Status, BlogID)
VALUES
    ('David Brown', 'david.brown@example.com', 
     'I loved how you highlighted various applications! ChatGPT has so much potential.', 
     6, GETDATE(), 'Approved', 2),
    ('Emma Wilson', 'emma.wilson@example.com', 
     'The use of ChatGPT in education is fascinating. It could change how we learn.', 
     2, GETDATE(), 'Approved', 2),
    ('Frank Taylor', 'frank.taylor@example.com', 
     'Awesome article! I never thought about its applications in customer service.', 
     1, GETDATE(), 'Approved', 2);

-- Comments for "Understanding ChatGPT" (BlogID = 1)
INSERT INTO BlogComment (Name, Email, Comment, LikeNumber, DateOfComment, Status, BlogID)
VALUES
    ('Grace Martinez', 'grace.martinez@example.com', 
     'This was a great introduction! I feel like I understand ChatGPT much better now.', 
     7, GETDATE(), 'Approved', 1),
    ('Hannah Kim', 'hannah.kim@example.com', 
     'Thanks for breaking down how ChatGPT works. Very helpful for newcomers!', 
     5, GETDATE(), 'Approved', 1),
    ('Ian Chen', 'ian.chen@example.com', 
     'I found the explanation of NLP concepts particularly useful. Good job!', 
     4, GETDATE(), 'Approved', 1);

-- Comments for "Responsive Design" (BlogID = 4)
INSERT INTO BlogComment (Name, Email, Comment, LikeNumber, DateOfComment, Status, BlogID)
VALUES
    ('Jack Wilson', 'jack.wilson@example.com', 
     'Responsive design is so important in today’s mobile-first world! Thanks for the tips.', 
     3, GETDATE(), 'Approved', 4),
    ('Kara Johnson', 'kara.johnson@example.com', 
     'Great article! I learned some new techniques to improve my designs.', 
     2, GETDATE(), 'Approved', 4),
    ('Leo Gonzalez', 'leo.gonzalez@example.com', 
     'I appreciate the examples you provided. They really help to illustrate the concepts.', 
     4, GETDATE(), 'Approved', 4);

-- Comments for "HTML & CSS Basics" (BlogID = 5)
INSERT INTO BlogComment (Name, Email, Comment, LikeNumber, DateOfComment, Status, BlogID)
VALUES
    ('Mia Smith', 'mia.smith@example.com', 
     'This is an excellent beginner guide! HTML and CSS are the building blocks of web development.', 
     5, GETDATE(), 'Approved', 5),
    ('Nate Brown', 'nate.brown@example.com', 
     'I love how you made complex concepts easy to understand! Very helpful for beginners.', 
     6, GETDATE(), 'Approved', 5),
    ('Olivia Lee', 'olivia.lee@example.com', 
     'The practical examples really solidified my understanding. Thank you!', 
     4, GETDATE(), 'Approved', 5);

-- Comments for "Introduction to Web Development" (BlogID = 6)
INSERT INTO BlogComment (Name, Email, Comment, LikeNumber, DateOfComment, Status, BlogID)
VALUES
    ('Paul Davis', 'paul.davis@example.com', 
     'Fantastic overview of web development! I’m excited to start my journey.', 
     7, GETDATE(), 'Approved', 6),
    ('Quinn White', 'quinn.white@example.com', 
     'The resources you provided are incredibly helpful for newcomers. Thank you!', 
     5, GETDATE(), 'Approved', 6),
    ('Rita Green', 'rita.green@example.com', 
     'This post covers all the basics and more! Can’t wait to dive deeper.', 
     3, GETDATE(), 'Approved', 6);

	 CREATE TABLE Program(
	    ProgramId INT PRIMARY KEY IDENTITY(1,1),
		Name VARCHAR(MAX),
		Title VARCHAR(MAX),
		Price VARCHAR(MAX),
		Image VARCHAR(MAX),
		Category VARCHAR(MAX),
		PeriodTime VARCHAR(MAX),
		Description1 VARCHAR(MAX),
		Description2 VARCHAR(MAX), 
		Curriculum VARCHAR(MAX), 
		DateOfStart DATETIME, 
	 );

	 CREATE TABLE Instructor(
	 
		InstructorId INT PRIMARY KEY IDENTITY(1,1),
		FirstName VARCHAR(MAX),
		SecondName VARCHAR(MAX),
		Email VARCHAR(MAX),
		LinkInProfile VARCHAR(MAX),

		Password NVARCHAR(MAX),

		PasswordHash VARBINARY(MAX),
		PasswordSalt VARBINARY(MAX),

		Image VARCHAR(MAX),

		Description VARCHAR(MAX),
		Education VARCHAR(MAX),

		ProgramID INT,
		CONSTRAINT FK_Program_Instructor
			FOREIGN KEY (ProgramID) 
			REFERENCES Program(ProgramId)
			ON DELETE CASCADE
	 );


	 

	 --drop table Program;
	 --drop table Instructor;
	
INSERT INTO Program (Name, Title, Price, Image, Category, PeriodTime, Description1, Description2,Curriculum, DateOfStart)
VALUES 
('Web Development', 'Build Dynamic Web Apps With .NET Framework.', '750', 'webdevelopment.jpg', 'Web', '4 Months', 'Develop dynamic websites using .NET Framework.', 'Learn web design, responsive design, and analytics.', 'Plane' ,'2024-10-01'),
('Mobile Development', 'Build Dynamic Mobile Apps With Flutter.', '700', 'mobiledevelopment.jpg', 'Mobile', '4 Months', 'Create cross-platform mobile apps using Flutter.', 'Learn how to develop feature-rich mobile apps.', 'Plane' ,'2024-10-01'),
('Data Science', 'Unlock Data Insights via Analysis, Machine Learning.', '800', 'datascience.jpg', 'Data Science', '4 Months', 'Master data analysis and machine learning.', 'Learn practical tools and techniques for data science.','Plane' , '2024-10-01');

INSERT INTO Instructor (FirstName, SecondName, Email,LinkInProfile,Password, PasswordHash, PasswordSalt, Image, Description, Education, ProgramID)
VALUES 
('Anas', 'Alnajar', 'anas@example.com','tt', 'password123', NULL, NULL, 'anas-image-url', 'Expert in Web and Data Science Development', 'BSc Computer Science', 1),
('Omar', 'Almahammed', 'omar@example.com','tt', 'password123', NULL, NULL, 'omar-image-url', 'Expert in Web and Data Science Development', 'BSc Computer Science', 1),
('Qusai', 'Sanjalawi', 'qusai@example.com', 'tt','password123', NULL, NULL, 'qusai-image-url', 'Flutter Mobile Development Specialist', 'BSc Mobile Computing', 2),
('Ahmed', 'Mohammed', 'ahmed@example.com', 'tt','password123', NULL, NULL, 'omar-image-url', 'Data Science and Web Development Expert', 'BSc Computer Science', 3),
('Ahmed', 'Mohammed', 'ahmed@example.com', 'tt','password123', NULL, NULL, 'omar-image-url', 'Data Science and Web Development Expert', 'BSc Computer Science', 3);


CREATE TABLE Payment (
   PaymentId INT PRIMARY KEY IDENTITY(1,1),
   Amount VARCHAR(MAX),
   PaymentMethod VARCHAR(MAX),
   TransactionId VARCHAR(MAX),
   PaymentStatus VARCHAR(MAX),
   PaymentDate DATETIME,

	 UserID INT,
		CONSTRAINT FK_User_Payment
			FOREIGN KEY (UserID) 
			 REFERENCES Users(UserId)
			ON DELETE CASCADE,

	 ProgramID INT,
		CONSTRAINT FK_Program_Payment
			FOREIGN KEY (ProgramID) 
			 REFERENCES Program (ProgramId)
			ON DELETE CASCADE

);


CREATE TABLE BillingDetails (
    BillingId INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100) ,
    Address NVARCHAR(255) ,
	City NVARCHAR(255) ,
    County NVARCHAR(100) ,
    Postcode NVARCHAR(50),

     UserID INT,
		CONSTRAINT FK_User_Billin
			FOREIGN KEY (UserID) 
			 REFERENCES Users(UserId)
			ON DELETE CASCADE
);


CREATE TABLE Student(
    StudentId INT PRIMARY KEY IDENTITY(1,1),

	 UserID INT,
		CONSTRAINT FK_User_Student
			FOREIGN KEY (UserID) 
			 REFERENCES Users(UserId)
			 ON DELETE CASCADE,


	ProgramID INT,
		CONSTRAINT FK_Program_Student
			FOREIGN KEY (ProgramID) 
			 REFERENCES Program (ProgramId)
			 ON DELETE CASCADE
)


CREATE TABLE Assignment(
    AssignmentId INT PRIMARY KEY IDENTITY(1,1),
	AssignmentName VARCHAR(MAX),
	AssignmentTitle VARCHAR(MAX),
	DeadTime DateTime,
	ProgramID INT,
		CONSTRAINT FK_Program_Assignment
			FOREIGN KEY (ProgramID) 
			 REFERENCES Program (ProgramId)
			 ON DELETE CASCADE
)

CREATE TABLE AssignmentSubmition(
    AssignmentSubmitionId INT PRIMARY KEY IDENTITY(1,1),

	AssignmentID INT,
	CONSTRAINT FK_Assignment_AssignmentSubmition
		FOREIGN KEY (AssignmentID) 
	    REFERENCES Assignment (AssignmentId),
		

	StudentID INT,
	CONSTRAINT FK_Student_AssignmentSubmition
		FOREIGN KEY (StudentID) 
	    REFERENCES Student (StudentId)
		ON DELETE CASCADE,

	ProgramID INT,
		CONSTRAINT FK_Program_AssignmentSubmition
			FOREIGN KEY (ProgramID) 
			 REFERENCES Program (ProgramId),

	Solution VARCHAR(MAX),

	DateOfSubmition DATETIME
)



CREATE TABLE Technology(
    TechnologyId INT PRIMARY KEY IDENTITY(1,1),
    TechnologyName VARCHAR(MAX),

    ProgramID INT,
    CONSTRAINT FK_Program_Technology
        FOREIGN KEY (ProgramID) 
        REFERENCES Program(ProgramId)
        ON DELETE CASCADE
);

CREATE TABLE Subject(
	SubjectId INT PRIMARY KEY IDENTITY(1,1),
    SubjectName VARCHAR(MAX),

	TechnologyID INT,
    CONSTRAINT FK_Subject_Technology
        FOREIGN KEY (TechnologyID) 
        REFERENCES Technology(TechnologyId)
        ON DELETE CASCADE
);


CREATE TABLE Content(
	ContentId INT PRIMARY KEY IDENTITY(1,1),
    ContentDetails VARCHAR(MAX),
	ContentTypes VARCHAR(MAX),

	SubjectID INT,
    CONSTRAINT FK_Subject_Content
        FOREIGN KEY (SubjectID) 
        REFERENCES Subject(SubjectId)
        ON DELETE CASCADE
);


