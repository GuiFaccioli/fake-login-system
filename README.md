# FakeLogin

Full stack study project focused on basic authentication, frontend-backend integration, HTTP routes, API consumption, and database connection.

## Objective

This project was created to practice fundamental web development concepts by simulating a real user registration and login flow.

The main goal is to improve practical skills in:

- HTML
- CSS
- JavaScript
- DOM
- Fetch API
- Node.js
- Express
- MySQL
- Git and GitHub

## Features

- User registration
- User login
- Frontend form validation
- Sending data to the backend
- `POST` routes for registration and login
- Database integration
- Success and error messages
- Redirect after login

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express

### Database
- MySQL

## Project Structure

```bash
FakeLogin/
├── FrontEnd/
│   ├── pages/
│   │   ├── login.html
│   │   ├── cadastro.html
│   │   └── home.html
│   ├── scripts/
│   │   ├── login.js
│   │   └── cadastro.js
│   └── styles/
│       └── style.css
├── BackEnd/
│   ├── server.js
│   ├── routers/
│   └── ...
├── package.json
└── README.md
How It Works

This project simulates a simple authentication flow:

The user fills in the registration or login form on the frontend
JavaScript captures the input data
The data is sent to the backend using fetch
The backend receives the request
The backend validates the data
The backend queries or stores the information in the database
The system returns a response to the frontend
The frontend displays the corresponding message to the user
Concepts Practiced

This project was built to reinforce important concepts such as:

DOM manipulation
Events
Asynchronous functions with async/await
HTTP requests
Express routes
Use of req.body
Frontend and backend validation
File organization
Relational database integration
Possible Future Improvements
Password hashing with bcrypt
JWT authentication
Logout
Route protection
More complete email validation
Better error handling
UI improvements
Responsiveness
Code refactoring
How to Run the Project
1. Clone the repository
git clone https://github.com/YOUR-USERNAME/FakeLogin.git
2. Go to the project folder
cd FakeLogin
3. Install backend dependencies
npm install
4. Configure the MySQL database

Create the database and the users table according to the structure used in the project.

Basic example:

CREATE DATABASE estudo;

USE estudo;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL
);
5. Configure the database connection in the backend

In the server file, update:

host
user
password
database
6. Start the server
node server.js

or, if you are using nodemon:

npx nodemon server.js
7. Open the frontend in the browser

Open the HTML file in the browser or run the project using a local server.

I usually use Live Server for this step.

What I Learned From This Project

During the development of this project, I practiced important concepts for a junior developer foundation, such as:

Frontend-backend communication
Route structure
Sending and receiving JSON data
Form validation
Database integration
Project folder organization
Basic authentication flow
Project Status

Project in progress for study purposes.

Author

Developed by Guilherme Faccioli as a web development learning project.
