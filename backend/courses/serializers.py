from rest_framework import serializers
from .models import Course, Instructor

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.ReadOnlyField(source='instructor.name')
    enrolled_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'code', 'description', 'category', 'price',
            'duration_hours', 'instructor', 'instructor_name', 'capacity',
            'enrolled_count', 'is_published', 'created_at'
        ]

    def get_enrolled_count(self, obj):
        return obj.enrollments.count() if hasattr(obj, 'enrollments') else 0
