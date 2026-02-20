from rest_framework import serializers

class EmployeeSerializer(serializers.Serializer):
    employee_id = serializers.CharField(max_length=50)
    full_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    department = serializers.CharField(max_length=100)

    def validate_employee_id(self, value):
        from core.db import db
        if db.employees.find_one({"employee_id": value}):
            raise serializers.ValidationError("An employee with this ID already exists.")
        return value

    def validate_email(self, value):
        from core.db import db
        # If updating, this might need adjustment, but for creation:
        if db.employees.find_one({"email": value}):
            raise serializers.ValidationError("An employee with this email already exists.")
        return value
