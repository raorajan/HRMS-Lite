# HRMS Lite Backend

A lightweight Human Resource Management System backend built with Django and MongoDB.

## Tech Stack
- **Framework:** Django 5.0+ / Django Rest Framework
- **Database:** MongoDB (via PyMongo)
- **Environment:** Python 3.13+
- **Utilities:** `python-dotenv`, `django-cors-headers`

## Project Structure
```text
backend/
├── core/             # Project configuration
│   ├── db.py         # MongoDB connection utility
│   ├── settings.py   # Django settings
│   └── urls.py       # Main URL routing
├── employees/        # Employee management app
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── attendance/       # Attendance management app
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── .env              # Environment variables
└── requirements.txt  # Dependencies
```

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-link>
   cd HRMS-Lite/backend
   ```

2. **Set up virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/
   DB_NAME=hrms_lite
   ```

5. **Run the server:**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### Employees
- `GET /api/employees/` - List all employees
- `POST /api/employees/` - Add a new employee
- `DELETE /api/employees/<employee_id>/` - Delete an employee

### Attendance
- `POST /api/attendance/mark/` - Mark attendance
- `GET /api/attendance/employee/<employee_id>/` - View attendance records for an employee
- `GET /api/attendance/summary/` - Dashboard summary (Total employees/records)

## Assumptions & Limitations
- **No Authentication:** As per requirements, the system assumes a single admin user without login.
- **MongoDB:** Used PyMongo for better compatibility with Python 3.13 and Django 5.0. No Django migrations are needed for the MongoDB collections.
- **Data Integrity:** Basic server-side validations (Email format, unique IDs) are implemented in serializers.
