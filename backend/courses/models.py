from django.db import models

class Instructor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    specialization = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.specialization})"

class Course(models.Model):
    CATEGORY_CHOICES = [
        ('PROGRAMMING', 'Programming & Software'),
        ('DATA_SCIENCE', 'Data Science & AI'),
        ('WEB_DEV', 'Web Development'),
        ('DATABASE', 'Database Systems'),
    ]

    title = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='PROGRAMMING')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    duration_hours = models.PositiveIntegerField(default=10)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE, related_name='courses')
    capacity = models.PositiveIntegerField(default=50)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.title}"
