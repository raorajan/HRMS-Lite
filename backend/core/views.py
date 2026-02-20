from rest_framework.views import APIView
from rest_framework.response import Response

class HomeView(APIView):
    def get(self, request):
        return Response({
            "message": "Welcome to HRMS Lite API",
            "status": "Running",
            "endpoints": {
                "employees": "/api/employees/",
                "attendance": "/api/attendance/",
                "admin": "/admin/"
            }
        })
