import React, { useState, useEffect } from 'react';
import './App.css';
import { api } from './services/api';

function App() {
  const [view, setView] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Course State
  const [courseForm, setCourseForm] = useState({
    title: '', code: '', description: '', category: 'PROGRAMMING',
    price: '', duration_hours: 20, instructor: '', capacity: 40
  });

  // New Student State
  const [studentForm, setStudentForm] = useState({ first_name: '', last_name: '', email: '', phone: '' });

  // Enrollment State
  const [enrollForm, setEnrollForm] = useState({ student: '', course: '' });

  // XML validation test state
  const [xmlInput, setXmlInput] = useState('');
  const [xmlResult, setXmlResult] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cRes, iRes, sRes, eRes] = await Promise.all([
        api.getCourses(),
        api.getInstructors(),
        api.getStudents(),
        api.getEnrollments()
      ]);
      setCourses(cRes.results || cRes || []);
      setInstructors(iRes.results || iRes || []);
      setStudents(sRes.results || sRes || []);
      setEnrollments(eRes.results || eRes || []);
    } catch (err) {
      console.error("Data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await api.createCourse({
        ...courseForm,
        instructor: parseInt(courseForm.instructor),
        price: parseFloat(courseForm.price),
        duration_hours: parseInt(courseForm.duration_hours),
        capacity: parseInt(courseForm.capacity)
      });
      alert("Course added successfully!");
      setCourseForm({ title: '', code: '', description: '', category: 'PROGRAMMING', price: '', duration_hours: 20, instructor: '', capacity: 40 });
      loadData();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await api.createStudent(studentForm);
      alert("Student registered successfully!");
      setStudentForm({ first_name: '', last_name: '', email: '', phone: '' });
      loadData();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      const res = await api.enrollStudent({
        student: parseInt(enrollForm.student),
        course: parseInt(enrollForm.course)
      });
      if (res.id) {
        alert("Student enrolled successfully!");
        loadData();
      } else {
        alert("Enrollment failed: " + JSON.stringify(res));
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleValidateXml = async () => {
    if (!xmlInput) return alert("Please enter XML content to validate.");
    try {
      const res = await api.validateXml(xmlInput);
      setXmlResult(res);
    } catch (err) {
      setXmlResult({ status: 'invalid', error: err.message });
    }
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <h1>EduTrack | Course & Student Platform</h1>
        <nav className="nav-links">
          <button className={view === 'courses' ? 'active' : ''} onClick={() => setView('courses')}>Courses</button>
          <button className={view === 'students' ? 'active' : ''} onClick={() => setView('students')}>Students</button>
          <button className={view === 'enrollments' ? 'active' : ''} onClick={() => setView('enrollments')}>Enrollments</button>
          <button className={view === 'xml' ? 'active' : ''} onClick={() => setView('xml')}>XML Data Hub</button>
        </nav>
      </header>

      <main className="main-content">
        {loading ? (
          <p>Loading course data...</p>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Active Courses</h3>
                <div className="stat-number">{courses.length}</div>
              </div>
              <div className="stat-card">
                <h3>Enrolled Students</h3>
                <div className="stat-number">{students.length}</div>
              </div>
              <div className="stat-card">
                <h3>Total Enrollments</h3>
                <div className="stat-number">{enrollments.length}</div>
              </div>
              <div className="stat-card">
                <h3>Instructors</h3>
                <div className="stat-number">{instructors.length}</div>
              </div>
            </div>

            {/* COURSES VIEW */}
            {view === 'courses' && (
              <>
                <div className="card">
                  <h2>Create New Course</h2>
                  <form onSubmit={handleCreateCourse}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Course Title</label>
                        <input required value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Course Code (e.g. CS-101)</label>
                        <input required value={courseForm.code} onChange={e => setCourseForm({...courseForm, code: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})}>
                          <option value="PROGRAMMING">Programming & Software</option>
                          <option value="DATA_SCIENCE">Data Science & AI</option>
                          <option value="WEB_DEV">Web Development</option>
                          <option value="DATABASE">Database Systems</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Instructor</label>
                        <select required value={courseForm.instructor} onChange={e => setCourseForm({...courseForm, instructor: e.target.value})}>
                          <option value="">Select Instructor</option>
                          {instructors.map(i => <option key={i.id} value={i.id}>{i.name} ({i.specialization})</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Price (INR)</label>
                        <input type="number" required value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Duration (Hours)</label>
                        <input type="number" required value={courseForm.duration_hours} onChange={e => setCourseForm({...courseForm, duration_hours: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Max Student Capacity</label>
                        <input type="number" required value={courseForm.capacity} onChange={e => setCourseForm({...courseForm, capacity: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label>Course Syllabus & Description</label>
                      <textarea rows="3" required value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary">Publish Course</button>
                  </form>
                </div>

                <div className="card">
                  <h2>
                    <span>Course Catalog</span>
                    <a href={api.exportCourseXml()} target="_blank" rel="noreferrer" className="btn btn-xml">Export Catalog (XML)</a>
                  </h2>
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Instructor</th>
                          <th>Price</th>
                          <th>Duration</th>
                          <th>Enrolled / Capacity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map(c => (
                          <tr key={c.id}>
                            <td><strong>{c.code}</strong></td>
                            <td>{c.title}</td>
                            <td>{c.category}</td>
                            <td>{c.instructor_name}</td>
                            <td>₹{c.price}</td>
                            <td>{c.duration_hours} hrs</td>
                            <td>{c.enrolled_count} / {c.capacity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* STUDENTS VIEW */}
            {view === 'students' && (
              <>
                <div className="card">
                  <h2>Register Student</h2>
                  <form onSubmit={handleCreateStudent}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>First Name</label>
                        <input required value={studentForm.first_name} onChange={e => setStudentForm({...studentForm, first_name: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input required value={studentForm.last_name} onChange={e => setStudentForm({...studentForm, last_name: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" required value={studentForm.email} onChange={e => setStudentForm({...studentForm, email: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input required value={studentForm.phone} onChange={e => setStudentForm({...studentForm, phone: e.target.value})} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Student</button>
                  </form>
                </div>

                <div className="card">
                  <h2>Enrolled Students Directory</h2>
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Registration Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(s => (
                          <tr key={s.id}>
                            <td>#{s.id}</td>
                            <td><strong>{s.full_name}</strong></td>
                            <td>{s.email}</td>
                            <td>{s.phone}</td>
                            <td>{s.enrolled_date}</td>
                            <td><span className="badge badge-active">{s.is_active ? 'Active' : 'Inactive'}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ENROLLMENTS VIEW */}
            {view === 'enrollments' && (
              <>
                <div className="card">
                  <h2>Enroll Student in Course</h2>
                  <form onSubmit={handleEnroll}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Select Student</label>
                        <select required value={enrollForm.student} onChange={e => setEnrollForm({...enrollForm, student: e.target.value})}>
                          <option value="">Choose Student</option>
                          {students.map(s => <option key={s.id} value={s.id}>{s.full_name} ({s.email})</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Select Course</label>
                        <select required value={enrollForm.course} onChange={e => setEnrollForm({...enrollForm, course: e.target.value})}>
                          <option value="">Choose Course</option>
                          {courses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.title} (Cap: {c.enrolled_count}/{c.capacity})</option>)}
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Complete Enrollment</button>
                  </form>
                </div>

                <div className="card">
                  <h2>All Active & Completed Enrollments</h2>
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Email</th>
                          <th>Course</th>
                          <th>Enrolled Date</th>
                          <th>Status</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrollments.map(e => (
                          <tr key={e.id}>
                            <td><strong>{e.student_name}</strong></td>
                            <td>{e.student_email}</td>
                            <td>{e.course_code}: {e.course_title}</td>
                            <td>{new Date(e.enrolled_at).toLocaleDateString()}</td>
                            <td><span className={`badge badge-${e.status.toLowerCase()}`}>{e.status}</span></td>
                            <td>{e.grade || 'In Progress'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* XML DATA HUB */}
            {view === 'xml' && (
              <div className="card">
                <h2>XML Schema Validation & Interchange Portal</h2>
                <p style={{ marginBottom: '1rem', color: '#64748b' }}>
                  Paste raw XML course data below to validate against the internal course XML Schema parser.
                </p>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <textarea
                    rows="8"
                    value={xmlInput}
                    onChange={e => setXmlInput(e.target.value)}
                    placeholder={`<CourseCatalog>
  <Course>
    <ID>1</ID>
    <Code>CS-301</Code>
    <Title>Full Stack Python</Title>
  </Course>
</CourseCatalog>`}
                  />
                </div>
                <button className="btn btn-xml" onClick={handleValidateXml}>Validate XML Data</button>

                {xmlResult && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '6px', background: xmlResult.status === 'valid' ? '#dcfce7' : '#fee2e2', border: `1px solid ${xmlResult.status === 'valid' ? '#86efac' : '#fca5a5'}` }}>
                    <strong>Validation Outcome: </strong> {xmlResult.message || xmlResult.error}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
