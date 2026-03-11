## 🔐 Role Based Authentication System
# JWT Authentication | Spring Boot | React | RBAC

A secure full-stack authentication system with JWT tokens and Role-Based Access Control (USER/ADMIN).
<br/>

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot)
![Thymeleaf](https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql)
![Security](https://img.shields.io/badge/Spring%20Security-success?style=for-the-badge)

---

<div align="center">
  <img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="520"/>
</div>

---

## 📸 Screenshots
### 🎓 Login Page
![Login Page](screenshots/login.png)

---
### 🛠️ Admin Dashboard
![Dashboard](screenshots/dashboard.png)
---
### 📝 RegisterPage
![Register Page](screenshots/register.png)
---

### ✨ Features
## 🔐 Authentication
User Registration (name, email, password, role)

Secure Login with JWT token

Password encryption (BCrypt)

Auto token attachment & logout

## 👥 Role Based Access
Role	Access
USER	Public + User content
ADMIN	Public + User + Admin content
🖥️ Backend
Spring Security + JWT Filter

Custom UserDetailsService

Java Records for DTOs

Swagger API docs

## 🎨 Frontend
React + TypeScript

Axios interceptors

Protected routes

Tailwind CSS

## 🛠️ Tech Stack
Backend

text
Java 17 | Spring Boot | Spring Security | JWT | JPA | MySQL | Maven
Frontend

text
React | TypeScript | Vite | React Router | Axios | Tailwind CSS
## 📁 Quick Structure
```text
backend/
├── config/         # Security & JWT
├── controller/     # REST APIs
├── service/        # Business logic
├── repository/     # Database
├── entity/         # User, Role
├── dto/            # Request/Response
└── security/       # JwtUtil

frontend/
├── api/           # Axios + interceptors
├── context/       # Auth context
├── pages/         # Login, Register, Dashboard
├── components/    # Layout, PrivateRoute
└── types/         # Interfaces
```

## 📡 API Endpoints
# Method	Endpoint	Role	Description
POST	/api/auth/register	Public	Register user
POST	/api/auth/login	Public	Login user
GET	/api/public	Public	Public content
GET	/api/user	USER/ADMIN	User content
GET	/api/admin	ADMIN	Admin content

## 🚀 Run Locally
# Prerequisites
Java 17, Node.js 18, MySQL 8, Maven

Backend
bash
git clone https://github.com/tiwarisaurabh786/Role-Based-Auth-System.git
cd backend

# Configure database in application.properties
```
spring.datasource.username=root
spring.datasource.password=yourpassword

mvn clean install
mvn spring-boot:run
# Runs on http://localhost:8080
Frontend
bash
cd frontend
npm install
echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env
npm run dev
# Runs on http://localhost:3000
```

## 👨‍💻 Author
Saurabh Tiwari
📧 tiwarisoravvka@gmail.com
🔗 GitHub | LeetCode
