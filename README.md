# Online Course & Student Management Platform

A modern e-learning course administration and student enrollment platform built with **Python**, **Django REST Framework (DRF)**, **React.js**, **MySQL**, and **XML / XML Schema (XSD)** data interchange.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.9%2B-blue)
![Django](https://img.shields.io/badge/Django-4.2-green)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![XML](https://img.shields.io/badge/Data-JSON%20%2F%20XML%20%26%20XSD-red)

---

## 📌 Project Overview

This platform simplifies educational content delivery and student administration:
* **Course Catalog & Curriculum**: Instructors can publish courses, set category tags, pricing, syllabus outlines, and enrollment capacity.
* **Student Directory**: Student profile management, registration dates, contact details, and academic tracking.
* **Enrollment Management**: One-click student enrollment with validation against course capacity and active status.
* **XML Data Interchange & Schema Validation (XSD)**:
  * Export course catalog data as standard W3C XML documents.
  * Ingest and validate external course syllabus feeds against an **XML Schema (`course_schema.xsd`)**.
  * Demonstrates structured data handling across both JSON (for frontend SPA consumption) and XML (for enterprise data interchange).
* **Responsive React Client**: Dynamic dashboard with search, filterable catalog, student directory, and raw XML export preview.

---

## 🗄️ Relational Database Schema

* **Instructors**: `id`, `name`, `email`, `bio`, `specialization`, `joined_at`
* **Courses**: `id`, `title`, `code`, `description`, `category`, `price`, `instructor_id (FK)`, `duration_hours`, `capacity`, `is_published`, `created_at`
* **Students**: `id`, `first_name`, `last_name`, `email`, `phone`, `date_of_birth`, `enrolled_date`, `is_active`
* **Enrollments**: `id`, `student_id (FK)`, `course_id (FK)`, `enrolled_at`, `status (ACTIVE, COMPLETED, DROPPED)`, `grade`

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
git clone https://github.com/udhayakumar001/online-course-student-management.git
cd online-course-student-management/backend

python -m venv venv
source venv/bin/activate  # Or venv\Scripts\activate on Windows

pip install -r requirements.txt

# Run migrations (Uses SQLite by default; MySQL connection settings ready in settings.py)
python manage.py makemigrations
python manage.py migrate

# Populate sample courses, instructors, and enrollments
python seed_data.py

# Start server
python manage.py runserver
```
Backend runs at `http://127.0.0.1:8000/`.

### 2. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```
Frontend runs at `http://localhost:3000/`.

---

## 📡 Key REST API & XML Endpoints

| Method | Endpoint | Description | Format |
| :--- | :--- | :--- | :--- |
| `GET / POST` | `/api/courses/` | List and create courses | JSON |
| `GET / PUT / DELETE` | `/api/courses/<id>/` | Course detail view & edit | JSON |
| `GET` | `/api/courses/export_xml/` | Download course catalog as XML | XML |
| `POST` | `/api/courses/validate_xml/` | Validate an uploaded XML file against XSD schema | JSON / XML |
| `GET / POST` | `/api/students/` | List and register students | JSON |
| `GET / POST` | `/api/enrollments/` | View enrollments or enroll a student | JSON |

---

## 👤 Author

* **Udhayakumar** - *Python Full Stack Developer*
* GitHub: [@udhayakumar001](https://github.com/udhayakumar001)
* LinkedIn: [linkedin.com/in/udhaya1635](https://linkedin.com/in/udhaya1635)
