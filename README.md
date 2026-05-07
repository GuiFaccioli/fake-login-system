# FlowLogin

FlowLogin is a practical web development project focused on user registration and login. It integrates front end, back end, and database layers to simulate a basic authentication flow using a custom API.

The project was created for learning purposes, with attention to organization, data persistence, essential validations, and password protection with bcrypt.

## Project Goal

FlowLogin was built to practice core concepts of a full-stack web application, including:

- user registration and login flow;
- integration between front end, back end, and database;
- consuming a custom API with `fetch`;
- creating routes with Express;
- validating data on both the front end and back end;
- persisting users with MySQL;
- protecting passwords with bcrypt hashes.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- MySQL
- bcrypt
- CORS
- Git and GitHub

## Features

- User registration.
- User login.
- Required field validation.
- Basic email format validation on the front end.
- Duplicate email verification on the back end.
- Password hashing with bcrypt before saving to the database.
- Password comparison with bcrypt during login.
- Front-end and back-end integration through `fetch`.
- JSON responses for registration and login.
- User storage in MySQL.
- Static front-end file serving through Express.

## Project Structure

```text
FlowLogin/
+-- BackEnd/
|   +-- controllers/
|   |   +-- authController.js
|   +-- database/
|   |   +-- schema.sql
|   +-- db/
|   |   +-- connection.js
|   +-- routes/
|   |   +-- authRoutes.js
|   +-- server.js
+-- FrontEnd/
|   +-- pages/
|   |   +-- cadastro.html
|   |   +-- home.html
|   |   +-- index.html
|   |   +-- login.html
|   |   +-- perfil.html
|   +-- scripts/
|   |   +-- cadastro.js
|   |   +-- exercicios.js
|   |   +-- login.js
|   |   +-- perfil.js
|   +-- styles/
|       +-- styles.css
+-- package.json
+-- package-lock.json
```

### Main Files

- `BackEnd/server.js`: starts the Express server and configures CORS, JSON parsing, and static files.
- `BackEnd/routes/authRoutes.js`: contains the registration and login routes.
- `BackEnd/db/connection.js`: configures the MySQL connection.
- `BackEnd/database/schema.sql`: SQL script to create the database and users table.
- `FrontEnd/pages`: HTML pages for the application.
- `FrontEnd/scripts`: scripts responsible for collecting form data and consuming the API.
- `FrontEnd/styles/styles.css`: interface styles.

## How to Run the Project Locally

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Enter the project folder

```bash
cd FlowLogin
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the MySQL database

Create the database and table using this file:

```text
BackEnd/database/schema.sql
```

You can run the script directly in MySQL Workbench, the MySQL terminal, or another database administration tool.

### 5. Configure the database connection

Edit this file:

```text
BackEnd/db/connection.js
```

Configure your local MySQL settings, such as `host`, `user`, `password`, and `database`. Avoid committing real passwords in public projects; a future improvement is to move these values to environment variables.

### 6. Start the server

The current `package.json` does not include a `start` script, so the server can be started with:

```bash
node BackEnd/server.js
```

By default, the server runs at:

```text
http://localhost:3002
```

### 7. Open the front end in the browser

With the server running, access one of the front-end pages:

```text
http://localhost:3002/pages/cadastro.html
```

or

```text
http://localhost:3002/pages/login.html
```

## Database

The project uses MySQL to store registered users.

The main script is located at:

```text
BackEnd/database/schema.sql
```

### `usuarios` Table

Columns identified in the project:

- `id`: unique user identifier.
- `usuario`: username provided during registration.
- `email`: user email, with a unique value constraint.
- `senha`: password protected with a bcrypt hash.

### SQL Script

```sql
CREATE DATABASE IF NOT EXISTS flowlogin;
USE flowlogin;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);
```

## Application Flow

During registration, the user fills in the name, email, and password fields. The front end collects the form data and sends a `POST` request to the back-end `/cadastro` route.

The back end validates the required fields, checks whether the email already exists in the database, generates a password hash with bcrypt, and saves the user in the MySQL `usuarios` table. Finally, it returns a JSON response to the front end.

During login, the front end sends the email and password to the `/login` route. The back end searches for the user by email, compares the submitted password with the saved hash using `bcrypt.compare`, and returns a JSON response indicating success or error. The front end displays the received message and, on success, redirects the user to the `home.html` page.

## What I Learned

- Creating a server with Express.
- Creating and organizing routes.
- Integrating with a MySQL database.
- Manipulating the DOM with JavaScript.
- Consuming a custom API with `fetch`.
- Validating data on the front end and back end.
- Building a basic authentication flow.
- Applying basic security with bcrypt password hashing.
- Organizing an initial full-stack project.

## Future Improvements

- Implement JWT authentication.
- Use environment variables with `.env`.
- Create a layered architecture with controllers, services, and repositories.
- Improve input validation.
- Return error messages with appropriate HTTP status codes.
- Create `package.json` scripts such as `start` and `dev`.
- Deploy the front end and back end.
- Add automated tests.
- Improve the visual interface.
- Remove hardcoded credentials from the connection file and use secure environment-based configuration.

## Author

Developed by Guilherme Faccioli Crescencio

LinkedIn: [linkedin.com/in/guilherme-faccioli-b8a46611a](https://linkedin.com/in/guilherme-faccioli-b8a46611a)

GitHub: [github.com/GuiFaccioli](https://github.com/GuiFaccioli)
