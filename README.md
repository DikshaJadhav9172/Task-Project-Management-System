📌 Task & Project Management System

📖 Overview

The Task & Project Management System is a web-based application designed to help teams efficiently organize, assign, and track project tasks. It enables structured workflow management, collaboration, and performance monitoring through dashboards.

The system supports multiple user roles and ensures secure access using authentication and authorization mechanisms.


🎯 Business Objectives


1.Provide a centralized platform for project and task management

2.Enable managers to assign and track tasks

3.Allow team members to update task progress and collaborate

4.Ensure secure role-based access control

5.Deliver real-time insights via dashboards


👥 User Roles


👤 Team Member (User)


1.Register and login

2.View assigned tasks

3.Update task status (Pending, In Progress, Completed)

4.Add comments to tasks

5.View personal dashboard


👨‍💼 Project Manager


1.Create and manage projects

2.Add users to projects

3.Create and assign tasks

4.Track project progress

5.Monitor team performance


🛠️ Admin

1.Manage users and roles

2.Monitor system usage

3.View system-wide statistics

4.Manage projects if required


🚀 Features


🔐 Authentication & Security


1.Secure login and signup

2.JWT-based authentication

3.Password hashing

4.Role-Based Access Control (RBAC)

5.Token expiration handling


📂 Project Management


1.Create and manage projects

2.Assign members

3.Set project timelines

4.Track project status (Planned, Active, Completed)


✅ Task Management


1.Create, update, delete tasks

2.Assign tasks to users

3.Set priorities (Low, Medium, High)

4.Track status (Pending, In Progress, Completed)

5.Set deadlines


💬 Comment System


1.Add comments on tasks

2.View team discussions

3.Timestamp tracking


📊 Dashboard


1.User Dashboard:

2.Total assigned tasks

3.Completed tasks

4.Pending tasks

5.Manager Dashboard:

6.Project progress overview

7.Task statistics

8.Team performance insights


🛠️ Tech Stack


Frontend:

1.React / Angular / Next.js

2.HTML5, CSS3 (Custom CSS only, no frameworks)

Backend:

1.Node.js / NestJS / Django REST Framework

Database:

1.PostgreSQL

Tools:

1.Git & GitHub

2.Postman

3.Swagger / OpenAPI

📁 Project Structure

Task-Project-Management-System/

│

├── frontend/

│   ├── components/

│   ├── pages/

│   ├── styles/

│

├── backend/

│   ├── controllers/

│   ├── services/

│   ├── repositories/

│   ├── routes/

│   ├── models/

│

├── database/

│   └── schema.sql

│

├── docs/

│   └── API_Documentation.md

│

├── README.md

└── package.json / requirements.txt


⚙️ Installation & Setup


1️⃣ Clone the Repository

git clone https://github.com/your-username/task-project-management-system.git

cd task-project-management-system

2️⃣ Install Dependencies

For Node.js:

npm install

For Django:

pip install -r requirements.txt

3️⃣ Database Setup

1.Create PostgreSQL database

2.Import schema from /database/schema.sql

3.Update database credentials in config file

4️⃣ Run the Application

Frontend:

npm start

Backend:

npm run dev

or

python manage.py runserver

🔌 API Documentation

1.APIs are documented using Swagger / OpenAPI

2.Postman collection is included

API groups:

1.Auth APIs

2.Project APIs

3.Task APIs

4.Admin APIs

🧪 Development Process

1.Finalize Technology Stack

2.Design Database (ER Diagram + Schema)

3.Backend Development

4.API Documentation

5.Frontend Development

6.Testing

7.Deployment (Optional: Docker)

📐 Architecture & Design

1.Follows SOLID Principles

2.Single Responsibility Principle

3.Open/Closed Principle

4.Liskov Substitution Principle

5.Interface Segregation Principle

6.Dependency Inversion Principle

Uses:

1.Service Layer Pattern

2.Repository Pattern

3.Clean Architecture

⚡ Non-Functional Requirements

1.Responsive UI

2.Secure APIs

3.Scalable architecture

4.Optimized database queries

🚫 Constraints

1.No use of CSS frameworks like:

a. Bootstrap

b. Tailwind

c. Material UI

2.Only:

a. Custom CSS

b. CSS Modules

c. SCSS

🔮 Future Enhancements

1.Real-time notifications

2.Email integration

3.Third-party integrations (Slack, Jira)

4.Mobile application

5.Activity logging

🐳 Optional Features

1.Docker containerization

2.docker-compose setup

🤝 Contributing

1.Fork the repository

2.Create a new branch

3.Commit changes

4.Submit a pull request

👩‍💻 Author

Diksha Jadhav

Computer Science Engineer

