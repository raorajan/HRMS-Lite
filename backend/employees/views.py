from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.db import db
from .serializers import EmployeeSerializer

class EmployeeListCreateView(APIView):
    def get(self, request):
        employees = list(db.employees.find({}, {"_id": 0}))
        return Response(employees)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            db.employees.insert_one(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeeDeleteView(APIView):
    def delete(self, request, employee_id):
        result = db.employees.delete_one({"employee_id": employee_id})
        if result.deleted_count:
            # Also delete attendance records if required by business logic
            db.attendance.delete_many({"employee_id": employee_id})
            return Response({"message": "Employee deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
