from rest_framework import serializers
from .models import Enrollment

class EnrollmentSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.full_name')
    student_email = serializers.ReadOnlyField(source='student.email')
    course_title = serializers.ReadOnlyField(source='course.title')
    course_code = serializers.ReadOnlyField(source='course.code')

    class Meta:
        model = Enrollment
        fields = [
            'id', 'student', 'student_name', 'student_email',
            'course', 'course_title', 'course_code', 'enrolled_at', 'status', 'grade'
        ]

    def validate(self, data):
        course = data.get('course')
        if course and course.enrollments.count() >= course.capacity:
            raise serializers.ValidationError({"course": "This course has reached its maximum enrollment capacity."})
        return data
