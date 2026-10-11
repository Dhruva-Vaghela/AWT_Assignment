import { Link } from "@tanstack/react-router";
import { useCollege } from "../context/CollegeContext";
import AttendanceStatus, { getAttendanceStatus } from "../components/AttendanceStatus";
import { ArrowLeft, Users } from "lucide-react";

// `id` comes from the dynamic route parameter /students/:id
function StudentDetails({ id }) {
  const { students } = useCollege();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="page">
        <div className="panel" style={{ padding: "3rem", textAlign: "center" }}>
          <div className="empty-icon" style={{ margin: "0 auto 1rem" }}>
            <Users size={22} strokeWidth={1.5} />
          </div>
          <p style={{ color: "var(--cd-muted)", marginBottom: "1rem" }}>Student not found.</p>
          <Link to="/students" className="btn btn-primary">Back to students</Link>
        </div>
      </div>
    );
  }

  const info = [
    ["Enrollment Number", student.enrollment],
    ["Email", student.email],
    ["Course", student.course],
    ["Semester", student.semester],
    ["Gender", student.gender],
    ["Attendance", `${student.attendance}%`],
  ];

  return (
    <div className="page">
      <Link to="/students" className="back-link fade-up">
        <ArrowLeft size={14} strokeWidth={2} />
        Back to Students
      </Link>

      {/* Profile header */}
      <div className="panel fade-up stagger-1">
        <div className="profile">
          <span className="avatar avatar-lg">{student.name.charAt(0)}</span>
          <div>
            <h1>{student.name}</h1>
            <p className="page-subtitle">{student.course} · Semester {student.semester}</p>
          </div>
          <div className="profile-status">
            <AttendanceStatus attendance={student.attendance} />
          </div>
        </div>
      </div>

      <div className="detail-grid fade-up stagger-2">
        {/* Info panel */}
        <div className="panel">
          <div className="panel-header">
            <h2>Student Information</h2>
          </div>
          <div className="panel-body">
            <dl className="info-list">
              {info.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              <div>
                <dt>Attendance Status</dt>
                <dd><AttendanceStatus attendance={student.attendance} /></dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Subjects panel */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <h2>Subject-wise Attendance</h2>
              <span className="panel-subtitle">{student.subjects.length} subjects</span>
            </div>
          </div>
          <div className="panel-body">
            {student.subjects.length === 0 ? (
              <p className="empty" style={{ paddingTop: "1.5rem" }}>No subjects recorded yet.</p>
            ) : (
              <ul className="subject-list">
                {student.subjects.map((subject) => {
                  const status = getAttendanceStatus(subject.attendance);
                  const barColor =
                    status === "Eligible" ? "var(--cd-green)" :
                    status === "Warning"  ? "var(--cd-amber)" : "var(--cd-red)";
                  return (
                    <li key={subject.name}>
                      <div className="subject-row">
                        <span style={{ color: "var(--cd-ink-2)", fontWeight: 500 }}>{subject.name}</span>
                        <strong style={{ fontSize: 13 }}>{subject.attendance}%</strong>
                      </div>
                      <div className="progress">
                        <div
                          className={`progress-bar progress-${status.toLowerCase()}`}
                          style={{ width: `${subject.attendance}%`, background: barColor }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
