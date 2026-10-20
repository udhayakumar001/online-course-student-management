const API_BASE = 'http://127.0.0.1:8000/api';

export const api = {
  getCourses: () => fetch(`${API_BASE}/courses/`).then(res => res.json()),
  createCourse: (data) => fetch(`${API_BASE}/courses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  getInstructors: () => fetch(`${API_BASE}/courses/instructors/`).then(res => res.json()),
  
  getStudents: () => fetch(`${API_BASE}/students/`).then(res => res.json()),
  createStudent: (data) => fetch(`${API_BASE}/students/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  getEnrollments: () => fetch(`${API_BASE}/enrollments/`).then(res => res.json()),
  enrollStudent: (data) => fetch(`${API_BASE}/enrollments/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  exportCourseXml: () => `${API_BASE}/courses/export_xml/`,
  validateXml: (xmlContent) => fetch(`${API_BASE}/courses/validate_xml/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ xml_content: xmlContent })
  }).then(res => res.json())
};
