import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Users, Trash2, ArrowRight } from "lucide-react";

/*
 * MEMOIZED: CourseCard (React.memo)
 * Why: typing in the course search / add-course form updates Courses page state.
 * What it avoids: cards whose course data and student count are unchanged
 * are not re-rendered on every keystroke.
 */
function CourseCard({ course, studentCount, onDelete }) {
  return (
    <div className="course-card">
      <div className="course-card-head">
        <span className="course-code">{course.code}</span>
        <span className={`badge ${course.status === "Active" ? "badge-eligible" : "badge-muted"}`}>
          {course.status}
        </span>
      </div>

      <h3>{course.name}</h3>
      <p className="muted" style={{ fontSize: 12.5 }}>{course.department}</p>

      <div className="course-meta">
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <BookOpen size={12} strokeWidth={2} style={{ color: "var(--cd-muted)" }} />
          Semester {course.semester}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Users size={12} strokeWidth={2} style={{ color: "var(--cd-muted)" }} />
          {studentCount} student{studentCount !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="course-actions">
        <Link to="/courses/$id" params={{ id: course.id }} className="btn btn-sm btn-primary" style={{ flex: 1, justifyContent: "center" }}>
          View details
          <ArrowRight size={12} strokeWidth={2} />
        </Link>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(course.id)}
          aria-label={`Delete ${course.name}`}
          title="Delete course"
        >
          <Trash2 size={12} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export default memo(CourseCard);
