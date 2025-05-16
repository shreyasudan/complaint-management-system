# Complaint Management System

A full-stack web application for managing customer complaints with client and admin views.

## Features

### Client Side
- Submit complaints with name, email, and complaint details
- Form validation and success confirmation
- Elegant UI with burgundy/wine red accent color scheme

### Admin Side
- View all complaints with details (name, email, message, date, status)
- Toggle status between "Pending" and "Resolved"
- Filter complaints by status
- Delete complaints
- Responsive table design with visual status indicators

## Screenshots

### Client Submission Form

![Client Form](./screenshots/submission.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin.png)

### Success Confirmation

![Success Confirmation](./screenshots/confirmation.png)

## Tech Stack

- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Database**: PostgreSQL

## Implementation Overview

The application includes:
- `/` (or `/submit`) - Public complaint submission form
- `/admin` - Internal dashboard for complaint management
- Backend API endpoints with PostgreSQL integration
- Custom UI with elegant color scheme inspired by professional design aesthetics

## Setup Instructions for Reviewers

### Important Note
While a start.sh script is provided, you may encounter issues depending on your PostgreSQL setup. Please follow these manual setup instructions for guaranteed success:

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed (any version)

### Database Setup

1. Create a PostgreSQL database named `complaints`:
   ```bash
   createdb complaints
   ```
   If the command is not found, you may need to add PostgreSQL to your PATH or use your system's PostgreSQL admin tool.

2. Apply the database schema:
   ```bash
   cd backend
   psql -d complaints -f src/db-schema.sql
   ```

### Environment Configuration

1. Create a `.env` file in the backend directory:
   ```bash
   cd backend
   ```

2. Add the following content (adjust username/password as needed for your PostgreSQL setup):
   ```
   PORT=3001
   DATABASE_URL=postgresql://YOUR_USERNAME[:YOUR_PASSWORD]@localhost:5432/complaints
   NODE_ENV=development
   ```
   Replace `YOUR_USERNAME` with your PostgreSQL username.
   Add `:YOUR_PASSWORD` after the username if your PostgreSQL requires a password.

### Starting the Application

1. Start the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. In a separate terminal, start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Access the application:
   - Client view: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin

### Quick Start (Optional)
If you prefer to try the automated setup:
```bash
chmod +x start.sh
./start.sh
```
Note: This may require adjustments based on your PostgreSQL setup.

## Original Setup Instructions

### Manual Setup

#### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running

#### Database Setup

1. Create a PostgreSQL database named `complaints`
2. Apply the database schema:

```bash
cd backend
psql -U postgres -d complaints -f src/db-schema.sql
```

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file with the following content (adjust as needed):
```
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/complaints
NODE_ENV=development
```

3. Install dependencies:
```bash
npm install
```

4. Build and start the server:
```bash
npm run build
npm start
```

For development with hot-reload:
```bash
npm run dev
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Access the application at `http://localhost:3000`

## API Endpoints

- `POST /complaints` - Submit a new complaint
- `GET /complaints` - Get all complaints
- `PATCH /complaints/:id` - Update complaint status
- `DELETE /complaints/:id` - Delete a complaint

## Assumptions and Tradeoffs

### Assumptions
- The system is for internal use within an organization
- Authentication is not required for this MVP but would be added in a production environment
- The system will handle a moderate number of complaints
- The application will run on a modern browser supporting ES6+ features

### Tradeoffs
- Simple UI/UX for quick implementation vs. more complex features
- Local PostgreSQL instead of Supabase to simplify initial setup
- No authentication to speed up development time
- Limited error handling for simplicity
- Basic schema design without additional metadata fields

## Future Improvements

With more time, I would implement:

1. **Authentication & Authorization**
   - Admin login system
   - Role-based permissions (admin, support staff, etc.)

2. **Enhanced Features**
   - Email notifications for new complaints and status changes
   - File attachment capabilities for complaints
   - More detailed complaint categorization
   - Full-text search functionality
   - Pagination for large datasets
   - More detailed complaint history and audit trail

3. **Technical Improvements**
   - Complete unit and integration tests
   - More comprehensive error handling
   - Data validation middleware
   - Rate limiting to prevent abuse
   - Production-ready deployment with Docker
   - CI/CD pipeline setup
   - Monitoring and logging infrastructure

4. **UI/UX Improvements**
   - Further responsive design optimizations
   - Accessibility enhancements
   - Dark mode support
   - Dashboard analytics and trends
   - Bulk actions for complaint management
   - Rich text editor for complaint details

---

