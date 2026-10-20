from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'full_name', 'email', 'phone', 'enrolled_date', 'is_active']
