from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.db import db
from .serializers import AttendanceSerializer

class AttendanceMarkView(APIView):
    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            data['date'] = str(data['date']) # Store as string for easy searching/display
            db.attendance.insert_one(data)
            # Remove _id before returning
            data.pop('_id', None)
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AttendanceListView(APIView):
    def get(self, request, employee_id):
        records = list(db.attendance.find({"employee_id": employee_id}, {"_id": 0}))
        return Response(records)

class AttendanceByDateView(APIView):
    def get(self, request):
        date = request.query_params.get('date')
        if not date:
            return Response({"error": "Date parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        records = list(db.attendance.find({"date": date}, {"_id": 0}))
        return Response(records)

    def delete(self, request):
        employee_id = request.query_params.get('employee_id')
        date = request.query_params.get('date')
        if not employee_id or not date:
            return Response({"error": "employee_id and date parameters are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        result = db.attendance.delete_one({"employee_id": employee_id, "date": date})
        if result.deleted_count > 0:
            return Response({"message": "Record deleted successfully."}, status=status.HTTP_200_OK)
        return Response({"error": "Record not found."}, status=status.HTTP_404_NOT_FOUND)

class AttendanceSummaryView(APIView):
    def get(self, request):
        # Bonus: Basic dashboard summary
        total_employees = db.employees.count_documents({})
        records = list(db.attendance.find({}, {"_id": 0}))
        return Response({
            "total_employees": total_employees,
            "total_attendance_records": len(records)
        })
