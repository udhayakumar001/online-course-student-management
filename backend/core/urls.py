from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/courses/', include('courses.urls')),
    path('api/students/', include('students.urls')),
    path('api/enrollments/', include('enrollments.urls')),
]
