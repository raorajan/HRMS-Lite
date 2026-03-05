from rest_framework.response import Response
from core.db import db

class HomeView(APIView):
    def get(self, request):
        db_status = "Connected"
        try:
            # Ping the database to check connectivity
            db.command('ping')
        except Exception:
            db_status = "Disconnected"

        return Response({
            "message": "HRMS Lite Backend is running",
            "database_status": db_status,
            "port": 8000,
            "api_version": "v1",
            "endpoints": {
                "employees": "/api/employees/",
                "attendance": "/api/attendance/",
                "admin": "/admin/"
            }
        })
