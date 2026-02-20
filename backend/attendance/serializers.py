from rest_framework import serializers
from datetime import datetime

class AttendanceSerializer(serializers.Serializer):
    employee_id = serializers.CharField(max_length=50)
    date = serializers.DateField()
    status = serializers.ChoiceField(choices=['Present', 'Absent'])

    def validate_employee_id(self, value):
        from core.db import db
        if not db.employees.find_one({"employee_id": value}):
            raise serializers.ValidationError("Employee does not exist.")
        return value

    def validate(self, data):
        from core.db import db
        # Stringify date for MongoDB storage if needed, or keep as date object if PyMongo handles it
        # Let's ensure no double marking for same day
        existing = db.attendance.find_one({
            "employee_id": data['employee_id'],
            "date": str(data['date'])
        })
        if existing:
            raise serializers.ValidationError("Attendance already marked for this date.")
        return data
