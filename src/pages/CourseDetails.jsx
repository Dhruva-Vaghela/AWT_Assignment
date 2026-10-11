import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useCollege } from "../context/CollegeContext";
import AttendanceStatus from "../components/AttendanceStatus";
import { ArrowLeft, BookOpen } from "lucide-react";

// `id` comes from the dynamic route parameter /courses/:id
function CourseDetails({ id }) {
  const { courses, students } = useCollege();
  const course = courses.find((c) => c.id === id);

  const enrolled = useMemo(
    () => (course ? students.filter((s) => s.course === course.name) : []),
    [students, course],
  );

  if (!course) {
    return (
      <div className="page">
        <div className="panel" style={{ padding: "3rem", textAlign: "center" }}>
          <div className="empty-icon" style={{ margin: "0 auto 1rem" }}>
            <BookOpen size={22} strokeWidth={1.5} />
          </div>
          <p style={{ color: "var(--cd-muted)", marginBottom: "1rem" }}>Course not found.</p>
          <Link to="/courses" className="btn btn-primary">Back to courses</Link>
        </div>
      </div>
    );
  }

  const info = [
    ["Course Code", course.code],
    ["Department", course.department],
    ["Semester", course.semester],
    ["Faculty", course.faculty],
    ["Enrolled Students", enrolled.length],
  ];

  return (
    <div className="page">
      <Link to="/courses" className="back-link fade-up">
        <ArrowLeft size={14} strokeWidth={2} />
        Back to Courses
      </Link>

      {/* Profile header */}
      <div className="panel fade-up stagger-1">
        <div className="profile">
          <div className="avatar avatar-lg" style={{ background: "var(--cd-primary-soft)", color: "var(--cd-primary)" }}>
            <BookOpen size={26} strokeWidth={1.5} />
          </div>
          <div>
            <h1>{course.name}</h1>
            <p className="page-subtitle">{course.code} · {course.department}</p>
          </div>
          <div className="profile-status">
            <span className={`badge ${course.status === "Active" ? "badge-eligible" : "badge-muted"}`}>
              {course.status}
            </span>
          </div>
        </div>
      </div>

      <div className="detail-grid fade-up stagger-2">
        {/* Info panel */}
        <div className="panel">
          <div className="panel-header">
            <h2>Course Information</h2>
          </div>
          <div className="panel-body">
            <dl className="info-list">
              {info.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Enrolled students */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <h2>
                Enrolled Students
                <span className="count">{enrolled.length}</span>
              </h2>
              <span className="panel-subtitle">All students in this course</span>
            </div>
          </div>
          <div className="panel-body">
            {enrolled.length === 0 ? (
              <p className="empty" style={{ paddingTop: "1.5rem" }}>No students enrolled in this course.</p>
            ) : (
              <ul className="enrolled-list">
                {enrolled.map((s) => (
                  <li key={s.id}>
                    <Link to="/students/$id" params={{ id: s.id }} className="person">
                      <span className="avatar">{s.name.charAt(0)}</span>
                      <div>
                        <strong style={{ fontSize: 13.5, display: "block", color: "var(--cd-ink)" }}>{s.name}</strong>
                        <small>{s.enrollment} · {s.attendance}% attendance</small>
                      </div>
                    </Link>
                    <AttendanceStatus attendance={s.attendance} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
