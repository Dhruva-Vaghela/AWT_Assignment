import { memo, useCallback, useMemo, useState } from "react";
import { useCollege } from "../context/CollegeContext";
import StudentForm from "../components/StudentForm";
import StudentCard from "../components/StudentCard";
import { Search, Filter, Users } from "lucide-react";

/*
 * MEMOIZED: StudentList (React.memo)
 * Why: the list only depends on the filtered array and the handlers.
 * What it avoids: re-rendering the whole table when unrelated page state
 * (e.g. the success alert) changes.
 */
const StudentList = memo(function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">
          <Users size={22} strokeWidth={1.5} />
        </div>
        <p>No students found.</p>
      </div>
    );
  }
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Enrollment</th>
            <th>Course</th>
            <th>Sem</th>
            <th>Attendance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

function Students() {
  const { students, courses, addStudent, updateStudent, deleteStudent } = useCollege();
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState("");

  const flash = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  // useMemo: filtering only re-runs when the list, search text or filter changes.
  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return students.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(term) || s.enrollment.includes(term);
      const matchesCourse = courseFilter === "All" || s.course === courseFilter;
      return matchesSearch && matchesCourse;
    });
  }, [students, search, courseFilter]);

  const courseNames = useMemo(() => courses.map((c) => c.name), [courses]);

  // useCallback keeps handler references stable so memoized StudentCard rows don't re-render.
  const handleEdit = useCallback((student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDelete = useCallback((id) => {
    if (window.confirm("Delete this student?")) {
      deleteStudent(id);
      flash("Student deleted.");
    }
  }, [deleteStudent]);

  const handleSubmit = (data) => {
    if (editingStudent) {
      updateStudent({ ...data, id: editingStudent.id });
      setEditingStudent(null);
      flash("Student updated successfully.");
    } else {
      addStudent(data);
      flash("Student added successfully.");
    }
  };

  return (
    <div className="page">
      <div className="page-header fade-up">
        <div className="page-header-left">
          <div className="page-eyebrow">
            <span className="page-eyebrow-dot" />
            Management
          </div>
          <h1>Students</h1>
          <p className="page-subtitle">Add, edit, search and manage student records.</p>
        </div>
      </div>

      {message && (
        <div className="alert alert-success fade-up">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M7.5 1.5a6 6 0 100 12 6 6 0 000-12zm2.85 4.65l-3.25 3.5a.5.5 0 01-.7.02l-1.5-1.5a.5.5 0 11.7-.7l1.16 1.16 2.9-3.13a.5.5 0 01.69.65z" fill="currentColor"/>
          </svg>
          {message}
        </div>
      )}

      <div className="fade-up stagger-1">
        <StudentForm
          courses={courses}
          students={students}
          editingStudent={editingStudent}
          onSubmit={handleSubmit}
          onCancel={() => setEditingStudent(null)}
        />
      </div>

      <div className="panel fade-up stagger-2">
        <div className="panel-header">
          <div className="panel-title-group">
            <h2>
              Student List
              <span className="count">{filteredStudents.length}</span>
            </h2>
            <span className="panel-subtitle">
              {students.length} total · {filteredStudents.length} shown
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="search-filter">
          <div className="search-input-wrap">
            <Search size={15} className="search-input-icon" aria-hidden="true" />
            <input
              type="text"
              className="input search-input"
              placeholder="Search by name or enrollment number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search students"
            />
          </div>
          <select
            className="input"
            style={{ maxWidth: 200 }}
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            aria-label="Filter by course"
          >
            <option value="All">All courses</option>
            {courseNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <StudentList students={filteredStudents} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Students;
