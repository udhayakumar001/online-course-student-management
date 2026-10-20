import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from courses.models import Course, Instructor
from students.models import Student
from enrollments.models import Enrollment

def run_seed():
    print("Clearing data...")
    Enrollment.objects.all().delete()
    Course.objects.all().delete()
    Instructor.objects.all().delete()
    Student.objects.all().delete()

    print("Adding Instructors...")
    inst1 = Instructor.objects.create(
        name="Dr. Sundaramoorthy",
        email="sundar@academy.edu",
        specialization="Backend Architecture & Python",
        bio="15+ years experience in software engineering and database design."
    )
    inst2 = Instructor.objects.create(
        name="Anitha Murugan",
        email="anitha@academy.edu",
        specialization="Frontend Engineering & UI/UX",
        bio="Senior Frontend Architect specializing in React and modern JavaScript."
    )

    print("Adding Courses...")
    c1 = Course.objects.create(
        title="Full Stack Python & Django Mastery",
        code="CS-301",
        description="Master building scalable APIs with Django, MySQL relational models, and authentication.",
        category="PROGRAMMING",
        price=4999.00,
        duration_hours=45,
        instructor=inst1,
        capacity=40,
        is_published=True
    )
    c2 = Course.objects.create(
        title="Modern React.js & Frontend State Management",
        code="CS-202",
        description="Build single-page web applications with React Hooks, Context API, and REST integration.",
        category="WEB_DEV",
        price=3999.00,
        duration_hours=35,
        instructor=inst2,
        capacity=50,
        is_published=True
    )
    c3 = Course.objects.create(
        title="Enterprise XML and Schema Design (XSD)",
        code="CS-405",
        description="Structured data exchange, XSD validation, and parsing pipelines for enterprise systems.",
        category="DATABASE",
        price=2999.00,
        duration_hours=20,
        instructor=inst1,
        capacity=30,
        is_published=True
    )

    print("Adding Students...")
    s1 = Student.objects.create(first_name="Udhayakumar", last_name="Student", email="udhaya1635@gmail.com", phone="916379622219")
    s2 = Student.objects.create(first_name="Vignesh", last_name="Kumar", email="vignesh@student.edu", phone="919876501234")
    s3 = Student.objects.create(first_name="Divya", last_name="Bharathi", email="divya@student.edu", phone="919876505678")

    print("Creating Enrollments...")
    Enrollment.objects.create(student=s1, course=c1, status="ACTIVE")
    Enrollment.objects.create(student=s1, course=c2, status="ACTIVE")
    Enrollment.objects.create(student=s2, course=c1, status="ACTIVE")
    Enrollment.objects.create(student=s3, course=c3, status="COMPLETED", grade="A")

    print("Course & Student platform data seeded successfully!")

if __name__ == '__main__':
    run_seed()
