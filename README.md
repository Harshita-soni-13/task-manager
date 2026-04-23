# Task Manager

A full-stack task management application with user authentication and CRUD operations for tasks.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- **JWT (jsonwebtoken)**: For user authentication and authorization
- **bcryptjs**: For password hashing
- **CORS**: For handling cross-origin requests
- **dotenv**: For environment variable management

### Frontend
- React
- Vite
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router DOM**: For client-side routing

## How to Run the App

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm 

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on `http://localhost:5000` (or the port specified in `.env`).

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

### Running the Full Application
1. Ensure MongoDB is running.
2. Start the backend server as described above.
3. Start the frontend development server as described above.
4. Open your browser and navigate to `http://localhost:5173` to use the application.

## API Details

The API is built with RESTful principles and uses JWT for authentication. All task-related endpoints require authentication.

### Authentication Endpoints
- **POST /api/auth/register**: Register a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
- **POST /api/auth/login**: Login user
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token" }`

### Task Endpoints (Protected)
All task endpoints require a Bearer token in the Authorization header.

- **POST /api/tasks/create**: Create a new task
  - Body: `{ "title": "string", "description": "string", "status": "string" }`
- **GET /api/tasks/get-all**: Get all tasks for the authenticated user
- **PUT /api/tasks/:id**: Update a task by ID
  - Body: `{ "title": "string", "description": "string", "status": "string" }`
- **DELETE /api/tasks/:id**: Delete a task by ID

### Error Handling
The API returns appropriate HTTP status codes and error messages in JSON format.