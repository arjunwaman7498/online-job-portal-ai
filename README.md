# 💼 Online Job Portal

A full-stack Job Portal web application developed as a **Bachelor of Engineering (Information Technology)**.

The application connects **jobseekers, recruiters, and administrators** through a single platform where users can search for jobs, apply for positions, post vacancies, and manage applications.

---

## 🚀 Live Demo

### Frontend

https://online-job-portal-ai-frontend.onrender.com

### Backend API

https://online-job-portal-ai.onrender.com

---

## ✨ Features

### 👤 Authentication

- User registration
- User login
- JWT authentication
- Role-based authorization
- Forgot password
- Reset password

---

### 🔎 Jobseeker Features

- Create an account
- Browse available jobs
- View job details
- Apply for jobs
- View submitted applications
- Manage profile information

---

### 🏢 Recruiter Features

- Recruiter dashboard
- Create job postings
- Edit job postings
- Delete job postings
- View applicants

---

### ⚙️ Admin Features

- Admin dashboard
- Manage jobs
- Manage applications
- View platform statistics
- Pagination

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Nodemailer
- Cloudinary
- Multer

---

## 📂 Project Structure

```text
online-job-portal-ai
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── uploads
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── routes
│   ├── services
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
```

---

### Install backend dependencies

```bash
cd backend
npm install
```

---

### Install frontend dependencies

```bash
cd frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
MONGO_URI=

JWT_SECRET=

EMAIL_USER=

EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

FRONTEND_URL=
```

---

## ▶️ Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

---

### Start the frontend

```bash
cd frontend
npm run dev
```

---

## 📸 Screenshots
- Home page
  
  <img width="1892" height="965" alt="Screenshot home" src="https://github.com/user-attachments/assets/5f924b3f-0f84-4c4e-9565-3836f1d94f67" />
  
- Login page
  
  <img width="1905" height="950" alt="image" src="https://github.com/user-attachments/assets/7cd86666-1ecb-4ba6-8fa8-5d0597f9a043" />
  
- Signup page
  
  <img width="1905" height="957" alt="image" src="https://github.com/user-attachments/assets/a288ce7d-71a5-4e26-8f68-ef11bd3a6288" />
  
- Forgot password page
  
  <img width="1897" height="961" alt="image" src="https://github.com/user-attachments/assets/3591b843-f3cc-476d-97a0-5c2806b4b718" />
  
- Recruiter dashboard
  
  <img width="1883" height="966" alt="image" src="https://github.com/user-attachments/assets/eeb4a39f-c202-478d-a61c-947888d64285" />
 
- Admin dashboard
 
  <img width="1875" height="961" alt="image" src="https://github.com/user-attachments/assets/78e27c02-932c-4a5e-b646-2efb3cc6cd81" />
  
- Job posting page
  
  <img width="1877" height="951" alt="image" src="https://github.com/user-attachments/assets/43dbab7a-3f42-4c7e-8d7c-bb7e6325bdbf" />
  
- Job details page
  
  <img width="1887" height="966" alt="image" src="https://github.com/user-attachments/assets/bf7b97f5-0bd2-4b0e-b2b9-8c4236bbf7fa" />
  
- Pagination
  
  <img width="1872" height="960" alt="image" src="https://github.com/user-attachments/assets/c3a51636-00c0-4af7-95cb-333a5f729899" />
 

---

## 📊 System Architecture

```text
Frontend (React + Tailwind CSS)
            │
            ▼
Backend (Node.js + Express.js)
            │
            ▼
MongoDB Database
```

---

## 🔮 Future Enhancements

- Resume ATS Score check
- Advanced search filters
- AI-based job recommendations
- Interview scheduling
- Real-time notifications

---

## 👨‍💻 Author

**Arjun Waman**

Bachelor of Engineering (Information Technology)

---

## 📄 License

This project was developed for educational purposes.
