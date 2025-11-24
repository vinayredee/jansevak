# JanSevak - Java Spring Boot Migration

## Overview
The backend has been successfully migrated from Node.js to **Java Spring Boot**. The Frontend (React) remains the same but is now configured to talk to the Java backend.

## Prerequisites
- **Java JDK 17+**
- **Maven**
- **PostgreSQL** (Database)

## How to Run

### 1. Start with Docker (Recommended)
Run the entire stack (Postgres, Backend, Frontend) with a single command:
```bash
docker-compose up --build
```
- Frontend: http://localhost:5000
- Backend: http://localhost:8080
- Database: localhost:5432

### 2. Manual Setup (Dev Mode)

#### Start the Database
Ensure your PostgreSQL database is running.
Update the `DATABASE_URL` in `server-java/src/main/resources/application.properties` if needed.

#### Start the Backend (Java)
Double-click `start-java.bat` in the root folder.
**OR** run this command in the terminal:
```bash
cd server-java
mvn spring-boot:run
```
The server will start on **port 8080**.

#### Start the Frontend (React)
Open a new terminal and run:
```bash
npm run dev:client
```
The frontend will start on **port 5000**.

## Features
- **User Authentication**: Register and Login (Spring Security).
- **Complaint Management**: Users can submit and view complaints.
- **Admin Dashboard**: Admins can view all complaints and update their status.

## API Endpoints
### Auth
- **Register**: `POST /api/register`
- **Login**: `POST /api/login`

### Complaints
- **Create**: `POST /api/complaints`
- **List (User)**: `GET /api/complaints`
- **List (Admin)**: `GET /api/complaints/all`
- **Update Status**: `PATCH /api/complaints/{id}/status`

## Roles (Testing)
By default, new users are created with the `USER` role.
To test the **Admin Dashboard**, you will need to manually update a user's role to `ADMIN` in the database:
```sql
UPDATE users SET role = 'ADMIN' WHERE username = 'your_username';
```

### 4. Email Notifications
- **Goal**: Verify that emails are sent when a complaint is created.
- **Steps**:
    1.  Ensure the backend is running with Mailtrap configuration (or check console logs if using placeholders).
    2.  Create a new complaint via the frontend.
    3.  Check the backend console logs for "Email sent to..." (if using the mock implementation) or check your Mailtrap inbox.
    4.  **Note**: If you haven't configured Mailtrap in `application.properties`, the `EmailService` will log an error but the application will continue to work.

### 5. Analytics Dashboard
- **Goal**: Verify that the admin dashboard displays complaint statistics.
- **Steps**:
    1.  Log in as an Admin.
    2.  Navigate to `/admin-dashboard`.
    3.  Observe the "Analytics Overview" section with Bar and Pie charts showing complaint counts by status.
    4.  Change the status of a complaint and verify the charts update (you may need to refresh or wait for auto-refetch).

## Project Structure
- `client/`: React Frontend
- `server-java/`: Spring Boot Backend
    - `src/main/java/com/jansevak/`: Java Source Code
    - `pom.xml`: Maven Dependencies
