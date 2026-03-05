# HRMS-Lite

A lightweight Human Resource Management System built with Django REST Framework (Backend) and React (Frontend).

## 🚀 Features

- **Employee Management**: Add, view, and delete employee records
- **Attendance Tracking**: Mark and view attendance records for employees
- **Dashboard**: Overview statistics and summary

## 🛠️ Tech Stack

### Backend
- Django 5.0+ / Django REST Framework
- MongoDB (via PyMongo)
- Python 3.13+

### Frontend
- React 19
- Vite
- Axios
- React Router
- Lucide React (Icons)

## 📁 Project Structure

```
HRMS-Lite/
├── backend/          # Django REST API
│   ├── core/        # Project configuration
│   ├── employees/   # Employee management app
│   └── attendance/  # Attendance management app
└── frontend/        # React application
    └── src/
        ├── components/
        ├── pages/
        └── api.js
```

## 🏃 Getting Started

### Prerequisites
- Python 3.13+
- Node.js 18+
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=mongodb://localhost:27017/
DB_NAME=hrms_lite
```

5. Run the server:
```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📡 API Endpoints

### Employees
- `GET /api/employees/` - List all employees
- `POST /api/employees/` - Add a new employee
- `DELETE /api/employees/<employee_id>/` - Delete an employee

### Attendance
- `POST /api/attendance/mark/` - Mark attendance
- `GET /api/attendance/employee/<employee_id>/` - View attendance records for an employee
- `GET /api/attendance/summary/` - Dashboard summary

## 📝 Assumptions & Limitations

- **No Authentication**: As per requirements, the system assumes a single admin user without login.
- **MongoDB**: Used PyMongo for better compatibility with Python 3.13 and Django 5.0.
- **Data Integrity**: Basic server-side validations (Email format, unique IDs) are implemented.

## 🔗 Links

- **Live Application**: https://hrms-lite-version.netlify.app
- **GitHub Repository**: https://github.com/raorajan/HRMS-Lite

## 📄 License

This project is part of a coding assignment.
