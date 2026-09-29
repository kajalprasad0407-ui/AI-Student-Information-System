import { useEffect, useState } from "react";
import "./App.css";

const sampleStudents = [
 
 {
  studentId: "ST001",
  name: "Rahul Sharma",
  rollNo: "101",
  course: "Information Technology",
  semester: 8,
  email: "rahul@example.com",
  phone: "9876543210",
  attendance: 85,
  marks: 78,
  performance: "Good",

  subjects: [
    {
      name: "Web Technology",
      marks: 82,
      attendance: 90
    },
    {
      name: "Database Management",
      marks: 76,
      attendance: 84
    },
    {
      name: "Computer Networks",
      marks: 71,
      attendance: 78
    },
    {
      name: "AI & Data Science",
      marks: 84,
      attendance: 88
    },
    {
      name: "Software Engineering",
      marks: 79,
      attendance: 82
    }
  ]
},
  {
    studentId: "ST003",
    name: "Amit Shah",
    rollNo: "103",
    course: "Computer Engineering",
    semester: 8,
    email: "amit@example.com",
    phone: "9876543212",
    attendance: 79,
    marks: 72,
    performance: "Average",
  },
  {
    studentId: "ST004",
    name: "Neha Verma",
    rollNo: "104",
    course: "Artificial Intelligence",
    semester: 7,
    email: "neha@example.com",
    phone: "9876543213",
    attendance: 88,
    marks: 81,
    performance: "Good",
  },
];

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
const [loadingStudents, setLoadingStudents] = useState(true);

useEffect(() => {
  fetch("https://ai-student-information-systemserver.onrender.com/api/students")
    .then((res) => res.json())
    .then((data) => {
      setStudents(data);
      setLoadingStudents(false);
    })
    .catch((error) => {
      console.error("Failed to fetch students:", error);
      setLoadingStudents(false);
    });
}, []);
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [showAddStudent, setShowAddStudent] = useState(false);

const [newStudent, setNewStudent] = useState({
  studentId: "",
  name: "",
  rollNo: "",
  course: "",
  semester: "",
  email: "",
  phone: "",
  attendance: "",
  marks: "",
  performance: "Good",
});
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      setLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setSelectedStudent(null);
  };
const handleAddStudent = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://ai-student-information-systemserver.onrender.com/api/students",{
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newStudent,
        semester: Number(newStudent.semester),
        attendance: Number(newStudent.attendance),
        marks: Number(newStudent.marks),
        subjects: [],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add student");
    }

    setStudents((prev) => [...prev, data.student]);

    setNewStudent({
      studentId: "",
      name: "",
      rollNo: "",
      course: "",
      semester: "",
      email: "",
      phone: "",
      attendance: "",
      marks: "",
      performance: "Good",
    });

    setShowAddStudent(false);
    setMessage("Student added successfully!");
  } catch (error) {
    console.error("Add student error:", error);
    setMessage(error.message);
  }
};
  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(query) ||
      student.studentId.toLowerCase().includes(query) ||
      student.rollNo.toLowerCase().includes(query)
    );
  });

  const handleSearch = () => {
    if (search.trim() === "") {
      setSelectedStudent(null);
      return;
    }

    if (filteredStudents.length > 0) {
      setSelectedStudent(filteredStudents[0]);
    } else {
      setSelectedStudent(null);
    }
  };

  if (loggedIn) {
    return (
      <div className="dashboard-page">

        <aside className="sidebar">
          <h2>🎓 AI Student</h2>
          <p className="system-name">Information System</p>

          <nav>
            <button onClick={() => setActivePage("dashboard")}>
  🏠 Dashboard
</button>
            <button onClick={() => setActivePage("students")}>
  👨‍🎓 Students
</button>
            <button onClick={() => setActivePage("attendance")}>
  📅 Attendance
</button>
            <button onClick={() => setActivePage("marks")}>
  📝 Marks
</button>
            <button onClick={() => setActivePage("ai")}>
  🤖 AI Analysis
</button>
            <button onClick={() => setActivePage("reports")}>
  📊 Reports
</button>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </aside>

        <main className="dashboard-main">

          <header className="topbar">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome to AI Student Information System</p>
            </div>

            <div className="user">
              👤 Admin
            </div>
          </header>
          {activePage === "dashboard" && (
  <div>

          {/* DASHBOARD CARDS */}

          <section className="cards">

            <div className="dashboard-card">
              <span>👨‍🎓</span>
              <h3>Total Students</h3>
              <strong>{students.length}</strong>
            </div>

            <div className="dashboard-card">
              <span>📅</span>
              <h3>Average Attendance</h3>
              <strong>
  {students.length > 0
    ? (
        students.reduce((sum, student) => sum + student.attendance, 0) /
        students.length
      ).toFixed(0) + "%"
    : "0%"}
</strong>
            </div>

            <div className="dashboard-card">
              <span>📝</span>
              <h3>Average Marks</h3>
              <strong>
  {students.length > 0
    ? (
        students.reduce((sum, student) => sum + student.marks, 0) /
        students.length
      ).toFixed(0) + "%"
    : "0%"}
</strong>
            </div>

            <div className="dashboard-card">
              <span>🤖</span>
              <h3>AI Predictions</h3>
              <strong>{students.length}</strong>
            </div>

          </section>

          {/* SEARCH */}

          <section className="search-section">

            <h2>Student Search</h2>

            <div className="search-box">

              <input
                type="text"
                placeholder="Search by Name, Student ID or Roll No..."
                value={search}
                onChange={(e) => {
  setSearch(e.target.value);
  setSelectedStudent(null);
}}
              />

              <button onClick={handleSearch}>
                🔍 Search
              </button>

            </div>

          </section>

          {/* SEARCH RESULT */}

          {search.trim() !== "" && (

            <section className="students-section">

              <h2>Search Results</h2>

              {filteredStudents.length > 0 ? (

                <table>

                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Roll No.</th>
                      <th>Course</th>
                      <th>Marks</th>
                      <th>Attendance</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredStudents.map((student) => (

                      <tr key={student.studentId}>

                        <td>{student.studentId}</td>
                        <td>{student.name}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.course}</td>
                        <td>{student.marks}%</td>
                        <td>{student.attendance}%</td>

                        <td>
                          <button
                            className="view-btn"
                            onClick={() =>
                              setSelectedStudent(student)
                            }
                          >
                            View
                          </button>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              ) : (

                <p className="no-result">
                  No student found.
                </p>

              )}

            </section>

          )}

          {/* STUDENT PROFILE */}

          {selectedStudent && (

            <section className="profile-section">

              <h2>Student Profile</h2>

              <div className="profile-card">

                <div className="profile-header">
                  <div className="profile-avatar">
                    👨‍🎓
                  </div>

                  <div>
                    <h2>{selectedStudent.name}</h2>
                    <p>{selectedStudent.studentId}</p>
                  </div>
                </div>
<div className="ai-analysis-section">

  <h3>🤖 AI Performance Analysis</h3>

  <div className="ai-summary">

    <div>
      <span>Attendance</span>
      <strong>{selectedStudent.attendance}%</strong>
    </div>

    <div>
      <span>Average Marks</span>
      <strong>{selectedStudent.marks}%</strong>
    </div>

    <div>
      <span>Performance Level</span>
      <strong>GOOD</strong>
    </div>

  </div>

  <div className="ai-result">

    <h4>Strong Areas</h4>

    <ul>
      <li>AI & Data Science</li>
      <li>Web Technology</li>
    </ul>

    <h4>Areas for Improvement</h4>

    <ul>
      <li>Computer Networks</li>
      <li>Database Management</li>
    </ul>

    <h4>AI Recommendation</h4>

    <p>
      The student is performing well overall. Improving
      Database Management and Computer Networks can
      further improve academic performance.
    </p>

  </div>

</div>
<div className="report-section">

  <h3>📊 Student Performance Report</h3>

  <div className="report-header">
    <div>
      <strong>Student Name</strong>
      <p>{selectedStudent.name}</p>
    </div>

    <div>
      <strong>Student ID</strong>
      <p>{selectedStudent.studentId}</p>
    </div>

    <div>
      <strong>Course</strong>
      <p>{selectedStudent.course}</p>
    </div>
  </div>

  <div className="report-summary">

    <div>
      <span>Attendance</span>
      <strong>{selectedStudent.attendance}%</strong>
    </div>

    <div>
      <span>Average Marks</span>
      <strong>{selectedStudent.marks}%</strong>
    </div>

    <div>
      <span>Performance</span>
      <strong>{selectedStudent.performance}</strong>
    </div>

  </div>

  <div className="report-recommendation">

    <h4>AI Recommendation</h4>

    <p>
      The student is performing well overall. Improving
      Database Management and Computer Networks can
      further improve academic performance.
    </p>

  </div>

  <button
    className="generate-btn"
    onClick={() => window.print()}
  >
    🖨️ Generate / Print Report
  </button>

</div>
                <div className="academic-section">

  <h3>Academic Performance</h3>

  <table>

    <thead>
      <tr>
        <th>Subject</th>
        <th>Marks</th>
        <th>Attendance</th>
      </tr>
    </thead>

    <tbody>

      {selectedStudent.subjects.map((subject, index) => (

        <tr key={index}>

          <td>{subject.name}</td>

          <td>{subject.marks}%</td>

          <td>{subject.attendance}%</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

                  <div>
                    <label>Roll Number</label>
                    <p>{selectedStudent.rollNo}</p>
                  </div>

                  <div>
                    <label>Course</label>
                    <p>{selectedStudent.course}</p>
                  </div>

                  <div>
                    <label>Semester</label>
                    <p>{selectedStudent.semester}</p>
                  </div>

                  <div>
                    <label>Email</label>
                    <p>{selectedStudent.email}</p>
                  </div>

                  <div>
                    <label>Phone</label>
                    <p>{selectedStudent.phone}</p>
                  </div>

                  <div>
                    <label>Attendance</label>
                    <p>{selectedStudent.attendance}%</p>
                  </div>

                  <div>
                    <label>Average Marks</label>
                    <p>{selectedStudent.marks}%</p>
                  </div>

                  <div>
                    <label>Performance</label>
                    <p>{selectedStudent.performance}</p>
                  </div>

                </div>

            </section>

          )}

          {/* RECENT STUDENTS */}

          {search.trim() === "" && (

            <section className="students-section">

              <h2>Recent Students</h2>

              <table>

                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Marks</th>
                    <th>Attendance</th>
                  </tr>
                </thead>

                <tbody>

                  {students.map((student) => (

                    <tr key={student.studentId}>

                      <td>{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>{student.course}</td>
                      <td>{student.marks}%</td>
                      <td>{student.attendance}%</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </section>

          )}
</div>
)}
{activePage === "students" && (
  <section className="students-section">
    <h2>👨‍🎓 Students</h2>
<button onClick={() => setShowAddStudent(true)}>
  ➕ Add Student
  {showAddStudent && (
  <form onSubmit={handleAddStudent} className="add-student-form">
    <h3>➕ Add New Student</h3>

    <input
      type="text"
      placeholder="Student ID"
      value={newStudent.studentId}
      onChange={(e) =>
        setNewStudent({ ...newStudent, studentId: e.target.value })
      }
      required
    />

    <input
      type="text"
      placeholder="Student Name"
      value={newStudent.name}
      onChange={(e) =>
        setNewStudent({ ...newStudent, name: e.target.value })
      }
      required
    />

    <input
      type="text"
      placeholder="Roll No"
      value={newStudent.rollNo}
      onChange={(e) =>
        setNewStudent({ ...newStudent, rollNo: e.target.value })
      }
      required
    />

    <input
      type="text"
      placeholder="Course"
      value={newStudent.course}
      onChange={(e) =>
        setNewStudent({ ...newStudent, course: e.target.value })
      }
      required
    />

    <input
      type="number"
      placeholder="Semester"
      value={newStudent.semester}
      onChange={(e) =>
        setNewStudent({ ...newStudent, semester: e.target.value })
      }
      required
    />

    <input
      type="email"
      placeholder="Email"
      value={newStudent.email}
      onChange={(e) =>
        setNewStudent({ ...newStudent, email: e.target.value })
      }
      required
    />

    <input
      type="text"
      placeholder="Phone"
      value={newStudent.phone}
      onChange={(e) =>
        setNewStudent({ ...newStudent, phone: e.target.value })
      }
      required
    />

    <input
      type="number"
      placeholder="Attendance %"
      value={newStudent.attendance}
      onChange={(e) =>
        setNewStudent({ ...newStudent, attendance: e.target.value })
      }
      required
    />

    <input
      type="number"
      placeholder="Marks %"
      value={newStudent.marks}
      onChange={(e) =>
        setNewStudent({ ...newStudent, marks: e.target.value })
      }
      required
    />

    <select
      value={newStudent.performance}
      onChange={(e) =>
        setNewStudent({ ...newStudent, performance: e.target.value })
      }
    >
      <option value="Excellent">Excellent</option>
      <option value="Good">Good</option>
      <option value="Average">Average</option>
      <option value="Poor">Poor</option>
    </select>

    <button type="submit">Save Student</button>

    <button
      type="button"
      onClick={() => setShowAddStudent(false)}
    >
      Cancel
    </button>
  </form>
)}
</button>
    <input
      type="text"
      placeholder="Search by Name, Student ID or Roll No..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Roll No.</th>
          <th>Course</th>
          <th>Marks</th>
          <th>Attendance</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredStudents.map((student) => (
          <tr key={student.studentId}>
            <td>{student.studentId}</td>
            <td>{student.name}</td>
            <td>{student.rollNo}</td>
            <td>{student.course}</td>
            <td>{student.marks}%</td>
            <td>{student.attendance}%</td>
            <td>
              <button onClick={() => setSelectedStudent(student)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {selectedStudent && (
      <div className="profile-card">
        <h3>{selectedStudent.name}</h3>
        <p>Student ID: {selectedStudent.studentId}</p>
        <p>Roll No: {selectedStudent.rollNo}</p>
        <p>Course: {selectedStudent.course}</p>
        <p>Semester: {selectedStudent.semester}</p>
        <p>Marks: {selectedStudent.marks}%</p>
        <p>Attendance: {selectedStudent.attendance}%</p>
        <p>Performance: {selectedStudent.performance}</p>
      </div>
    )}
  </section>
)}
{activePage === "attendance" && (
  <section className="students-section">
    <h2>📅 Student Attendance</h2>

    <h3>Select Student</h3>

    <div className="student-buttons">
      {students.map((student) => (
        <button
          key={student.studentId}
          onClick={() => setSelectedStudent(student)}
        >
          {student.name}
        </button>
      ))}
    </div>

    {selectedStudent && (
      <div className="profile-card">
        <h3>{selectedStudent.name}</h3>

        <p>
          <b>Student ID:</b> {selectedStudent.studentId}
        </p>

        <p>
          <b>Overall Attendance:</b> {selectedStudent.attendance}%
        </p>

        <h4>Subject-wise Attendance</h4>

        {selectedStudent.subjects &&
          selectedStudent.subjects.length > 0 ? (
            selectedStudent.subjects.map((subject) => (
              <p key={subject.name}>
                {subject.name}: <b>{subject.attendance}%</b>
              </p>
            ))
          ) : (
            <p>No subject-wise attendance available.</p>
          )}
      </div>
    )}
  </section>
)}
{activePage === "marks" && (
  <section className="students-section">
    <h2>📝 Student Marks</h2>

    <h3>Select Student</h3>

    <div className="student-buttons">
      {students.map((student) => (
        <button
          key={student.studentId}
          onClick={() => setSelectedStudent(student)}
        >
          {student.name}
        </button>
      ))}
    </div>

    {selectedStudent && (
      <div className="profile-card">
        <h3>{selectedStudent.name}</h3>

        <p>
          <b>Student ID:</b> {selectedStudent.studentId}
        </p>

        <p>
          <b>Overall Marks:</b> {selectedStudent.marks}%
        </p>

        <h4>Subject-wise Marks</h4>

        {selectedStudent.subjects &&
        selectedStudent.subjects.length > 0 ? (
          selectedStudent.subjects.map((subject) => (
            <p key={subject.name}>
              {subject.name}: <b>{subject.marks}</b>
            </p>
          ))
        ) : (
          <p>No subject-wise marks available.</p>
        )}
      </div>
    )}
  </section>
)}
{activePage === "ai" && (
  <section className="students-section">
    <h2>🤖 AI Performance Analysis</h2>
    <p>Analyze student performance and generate recommendations.</p>

    <h3>Select Student</h3>

    <div className="student-buttons">
      {students.map((student) => (
        <button
          key={student.studentId}
          onClick={() => setSelectedStudent(student)}
        >
          {student.name}
        </button>
      ))}
    </div>

    {selectedStudent ? (
      <div className="profile-card">
        <h3>{selectedStudent.name}</h3>

        <p>
          <b>Student ID:</b> {selectedStudent.studentId}
        </p>

        <p>
          <b>Marks:</b> {selectedStudent.marks}%
        </p>

        <p>
          <b>Attendance:</b> {selectedStudent.attendance}%
        </p>

        <p>
          <b>Performance:</b> {selectedStudent.performance}
        </p>

        <hr />

        <h3>📊 AI Analysis</h3>

        <p>
          {selectedStudent.marks >= 80
            ? "The student is performing very well academically."
            : selectedStudent.marks >= 60
            ? "The student has satisfactory academic performance."
            : "The student needs improvement in academic performance."}
        </p>

        <h3>🎯 Weak Area Analysis</h3>

        {selectedStudent.subjects &&
        selectedStudent.subjects.length > 0 ? (
          selectedStudent.subjects
            .filter((subject) => subject.marks < 60)
            .map((subject) => (
              <p key={subject.name}>
                ⚠️ {subject.name}: {subject.marks}%
              </p>
            ))
        ) : (
          <p>No subject-wise data available.</p>
        )}

        <h3>💡 AI Recommendation</h3>

        <p>
          {selectedStudent.attendance < 75
            ? "Improve attendance and attend lectures regularly."
            : selectedStudent.marks < 60
            ? "Focus on weak subjects and practice more questions."
            : "Maintain the current performance and continue regular practice."}
        </p>
      </div>
    ) : (
      <p>Please select a student to view AI analysis.</p>
    )}
  </section>
)}
{activePage === "reports" && (
  <section className="students-section">
    <h2>📊 Student Performance Reports</h2>
    <p>View complete academic performance report of a student.</p>

    <h3>Select Student</h3>

    <div className="student-buttons">
      {students.map((student) => (
        <button
          key={student.studentId}
          onClick={() => setSelectedStudent(student)}
        >
          {student.name}
        </button>
      ))}
    </div>

    {selectedStudent ? (
      <div className="profile-card">
        <h3>📄 Student Report</h3>

        <p>
          <b>Student ID:</b> {selectedStudent.studentId}
        </p>

        <p>
          <b>Name:</b> {selectedStudent.name}
        </p>

        <p>
          <b>Roll No:</b> {selectedStudent.rollNo}
        </p>

        <p>
          <b>Course:</b> {selectedStudent.course}
        </p>

        <p>
          <b>Semester:</b> {selectedStudent.semester}
        </p>

        <hr />

        <h3>📚 Academic Performance</h3>

        <p>
          <b>Overall Marks:</b> {selectedStudent.marks}%
        </p>

        <p>
          <b>Overall Attendance:</b> {selectedStudent.attendance}%
        </p>

        <p>
          <b>Performance:</b> {selectedStudent.performance}
        </p>

        <hr />

        <h3>📖 Subject-wise Performance</h3>

        {selectedStudent.subjects &&
        selectedStudent.subjects.length > 0 ? (
          selectedStudent.subjects.map((subject) => (
            <p key={subject.name}>
              <b>{subject.name}</b> — Marks: {subject.marks}% | Attendance:{" "}
              {subject.attendance}%
            </p>
          ))
        ) : (
          <p>No subject-wise data available.</p>
        )}

        <hr />

        <h3>🤖 Recommendation</h3>

        <p>
          {selectedStudent.marks >= 80
            ? "Maintain the current academic performance."
            : selectedStudent.marks >= 60
            ? "Improve consistency and focus on weaker subjects."
            : "Immediate academic improvement and additional practice are recommended."}
        </p>
      </div>
    ) : (
      <p>Please select a student to generate the report.</p>
    )}
  </section>
)}
        </main>

      </div>
    );
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo">🎓</div>

        <h1>AI Student</h1>
        <h2>Information System</h2>

        <p className="welcome">
          Welcome back! Please login to continue.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        <p className="demo">
          Demo Login: admin@gmail.com / admin123
        </p>

      </div>

    </div>
  );
}

export default App;