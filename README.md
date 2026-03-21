# 🚀 Task & Project Management System (Full Stack)

A complete **full-stack web application** for managing tasks, projects, users, and collaboration — built with **Node.js, Express, PostgreSQL, and React**.

🔗 **Live Website:**
https://task-and-project-management-system.onrender.com

🔗 **Live Swagger API Docs:**
https://task-and-project-management-system.onrender.com/api-docs

---

## 📌 Features

### 🔐 Authentication & Security

* JWT-based Login & Register
* Password hashing using **bcrypt**
* Role-based authorization (Admin / Manager / User)

---

## 👑 Roles & Permissions

### 🛡️ Admin

* View all users
* Search & filter users
* Update user roles
* Delete users (cannot delete self)
* Create, update, delete projects
* Create, assign, and delete tasks
* View all tasks
* Access manager dashboard

---

### 🧑‍💼 Manager

* Create, update, delete projects
* Create and assign tasks
* View all tasks
* Delete tasks
* Access manager dashboard

---

### 👤 User

* View only assigned tasks
* Update task **status only**
* Add comments on tasks
* Access personal dashboard

---

## 🖥️ Frontend (React)

### ✨ Features

* Role-based UI (Admin / Manager / User)
* Dashboard system
* Task & project management UI
* API integration with backend
* Fully responsive design

### 🎨 Tech Stack

* React.js
* React Router
* Custom CSS (no UI frameworks)
* Lucide Icons
* JWT authentication handling

---

## 🛠️ Backend Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcrypt
* Swagger (API documentation)

---

## 🐳 Docker & Deployment (Bonus 🚀)

* Application containerized using **Docker**
* Includes `Dockerfile` and `.dockerignore`
* Deployed on **Render using Docker container**
* Ensures:

  * Consistent environment
  * Easy scalability
  * Production-ready deployment

---

## 📂 Project Structure

```bash
.
├── backend/
│   ├── .dist/
│   ├── config/
│   ├── controllers/
│   ├── docs/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env (ignored)
│
├── frontend/
│   ├── dist/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env (ignored)
│
├── Dockerfile
├── .dockerignore
├── .gitignore
```

---

## ⚠️ Environment Variables

🚨 `.env` files are ignored for security.

### Backend `.env`

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=task_management

JWT_SECRET=your_secret_key
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-project-management.git
cd task-project-management
```

---

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Base URL

* Local:

  ```
  http://localhost:5000
  ```

* Production:

  ```
  https://task-and-project-management-system.onrender.com
  ```

---

## 📘 Swagger API Docs

👉 https://task-and-project-management-system.onrender.com/api-docs

---

## 🔒 Security

* JWT Authentication
* bcrypt password hashing
* Role-based access control
* Environment variable protection

---

## 🚀 Deployment

* Dockerized application
* Deployed on **Render using Docker**
* Live API + Swagger available

👉 https://task-and-project-management-system.onrender.com/api-docs

---

## 👨‍💻 Author

**Diksha Jadhav**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
