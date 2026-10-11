import { memo, useCallback, useMemo, useState } from "react";
import { useCollege } from "../context/CollegeContext";
import CourseCard from "../components/CourseCard";
import { Search, Plus, X, BookOpen } from "lucide-react";

const emptyCourse = { name: "", code: "", department: "", semester: "", faculty: "", status: "Active" };

/*
 * MEMOIZED: CourseList (React.memo)
 * Why: typing in the Add Course form changes page state but not the course list.
 * What it avoids: re-rendering the whole grid on every form keystroke.
 */
const CourseList = memo(function CourseList({ courses, studentCounts, onDelete }) {
  if (courses.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">
          <BookOpen size={22} strokeWidth={1.5} />
        </div>
        <p>No courses found.</p>
      </div>
    );
  }
  return (
    <div className="course-grid" style={{ padding: "1.5rem" }}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} studentCount={studentCounts[course.name] || 0} onDelete={onDelete} />
      ))}
    </div>
  );
});

function Courses() {
  const { courses, students, addCourse, deleteCourse } = useCollege();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState(emptyCourse);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

  // useMemo: count students per course only when students change.
  const studentCounts = useMemo(
    () => students.reduce((acc, s) => ({ ...acc, [s.course]: (acc[s.course] || 0) + 1 }), {}),
    [students],
  );

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [courses, search, statusFilter]);

  const handleDelete = useCallback((id) => {
    if (window.confirm("Delete this course?")) deleteCourse(id);
  }, [deleteCourse]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = {};
    ["name", "code", "department", "semester", "faculty"].forEach((key) => {
      if (!String(form[key]).trim()) found[key] = "This field is required.";
    });
    if (form.code && courses.some((c) => c.code.toLowerCase() === form.code.trim().toLowerCase()))
      found.code = "Course code already exists.";
    setErrors(found);
    if (Object.keys(found).length) return;
    addCourse({ ...form, code: form.code.trim().toUpperCase(), semester: Number(form.semester) });
    setForm(emptyCourse);
    setShowForm(false);
  };

  const input = (name, label, placeholder) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} className="input" value={form[name]} onChange={handleChange} placeholder={placeholder} />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="page">
      <div className="page-header fade-up">
        <div className="page-header-left">
          <div className="page-eyebrow">
            <span className="page-eyebrow-dot" />
            Management
          </div>
          <h1>Courses</h1>
          <p className="page-subtitle">Browse, add and manage college courses.</p>
        </div>
        <button
          className={`btn ${showForm ? "btn-outline" : "btn-primary"}`}
          onClick={() => setShowForm((s) => !s)}
          aria-expanded={showForm}
        >
          {showForm ? (
            <><X size={14} strokeWidth={2} /> Close</>
          ) : (
            <><Plus size={14} strokeWidth={2} /> Add Course</>
          )}
        </button>
      </div>

      {showForm && (
        <form className="panel form fade-up" onSubmit={handleSubmit} noValidate>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h2 style={{ marginBottom: 0 }}>Add New Course</h2>
              <p style={{ fontSize: 12, color: "var(--cd-muted)", marginTop: 2 }}>
                Fill in the details below to create a new course.
              </p>
            </div>
            <BookOpen size={20} strokeWidth={1.5} style={{ color: "var(--cd-muted)" }} aria-hidden="true" />
          </div>
          <div className="form-grid">
            {input("name", "Course Name", "e.g. B.Sc Physics")}
            {input("code", "Course Code", "e.g. PHY101")}
            {input("department", "Department", "e.g. Science")}
            {input("faculty", "Faculty", "e.g. Dr. A. Kumar")}
            <div className="field">
              <label htmlFor="semester">Semester</label>
              <select id="semester" name="semester" className="input" value={form.semester} onChange={handleChange}>
                <option value="">Select semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              {errors.semester && <span className="error">{errors.semester}</span>}
            </div>
            <div className="field">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" className="input" value={form.status} onChange={handleChange}>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <Plus size={14} strokeWidth={2} />
              Add Course
            </button>
          </div>
        </form>
      )}

      <div className="panel fade-up stagger-2">
        {/* Search & Filter */}
        <div className="search-filter">
          <div className="search-input-wrap">
            <Search size={15} className="search-input-icon" aria-hidden="true" />
            <input
              type="text"
              className="input search-input"
              placeholder="Search by course name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search courses"
            />
          </div>
          <select
            className="input"
            style={{ maxWidth: 180 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            {["Active", "Inactive"].map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <CourseList courses={filteredCourses} studentCounts={studentCounts} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Courses;
