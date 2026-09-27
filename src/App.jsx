import { useState } from "react";
import "./App.css";

const students = [
 
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

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");

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
            <button>🏠 Dashboard</button>
            <button>👨‍🎓 Students</button>
            <button>📅 Attendance</button>
            <button>📝 Marks</button>
            <button>🤖 AI Analysis</button>
            <button>📊 Reports</button>
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

          {/* DASHBOARD CARDS */}

          <section className="cards">

            <div className="dashboard-card">
              <span>👨‍🎓</span>
              <h3>Total Students</h3>
              <strong>120</strong>
            </div>

            <div className="dashboard-card">
              <span>📅</span>
              <h3>Average Attendance</h3>
              <strong>82%</strong>
            </div>

            <div className="dashboard-card">
              <span>📝</span>
              <h3>Average Marks</h3>
              <strong>76%</strong>
            </div>

            <div className="dashboard-card">
              <span>🤖</span>
              <h3>AI Predictions</h3>
              <strong>85</strong>
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
                onChange={(e) => setSearch(e.target.value)}
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