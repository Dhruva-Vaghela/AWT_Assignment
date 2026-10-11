import { useEffect, useState } from "react";
import { UserPlus, X } from "lucide-react";

const emptyStudent = { name: "", enrollment: "", email: "", course: "", semester: "", gender: "", attendance: "" };

function validate(values, students, editingId) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Student name is required.";
  if (!values.enrollment.trim()) errors.enrollment = "Enrollment number is required.";
  else if (!/^\d{4,12}$/.test(values.enrollment.trim())) errors.enrollment = "Enrollment must be 4–12 digits.";
  else if (students.some((s) => s.enrollment === values.enrollment.trim() && s.id !== editingId))
    errors.enrollment = "This enrollment number already exists.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.course) errors.course = "Please select a course.";
  if (!values.semester) errors.semester = "Please select a semester.";
  if (!values.gender) errors.gender = "Please select a gender.";
  const att = Number(values.attendance);
  if (values.attendance === "") errors.attendance = "Attendance is required.";
  else if (Number.isNaN(att) || att < 0 || att > 100) errors.attendance = "Attendance must be between 0 and 100.";
  return errors;
}

// Controlled form used for both Add and Edit.
function StudentForm({ courses, students, editingStudent, onSubmit, onCancel }) {
  const [values, setValues] = useState(emptyStudent);
  const [errors, setErrors] = useState({});

  // When an edit is requested, fill the form with that student's data.
  useEffect(() => {
    setValues(editingStudent ? { ...editingStudent, semester: String(editingStudent.semester), attendance: String(editingStudent.attendance) } : emptyStudent);
    setErrors({});
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate(values, students, editingStudent?.id);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;
    onSubmit({ ...values, name: values.name.trim(), enrollment: values.enrollment.trim(), semester: Number(values.semester), attendance: Number(values.attendance) });
    if (!editingStudent) setValues(emptyStudent);
  };

  const field = (name, label, input) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {input}
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ marginBottom: 0 }}>
            {editingStudent ? "Edit Student" : "Add New Student"}
          </h2>
          <p style={{ fontSize: 12, color: "var(--cd-muted)", marginTop: 2 }}>
            {editingStudent ? "Update the student's information below." : "Fill in the fields below to enroll a new student."}
          </p>
        </div>
        <UserPlus size={20} strokeWidth={1.5} style={{ color: "var(--cd-muted)" }} aria-hidden="true" />
      </div>

      <div className="form-grid">
        {field("name", "Full Name", <input id="name" name="name" className="input" value={values.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" />)}
        {field("enrollment", "Enrollment Number", <input id="enrollment" name="enrollment" className="input" value={values.enrollment} onChange={handleChange} placeholder="e.g. 1023" />)}
        {field("email", "Email Address", <input id="email" name="email" type="email" className="input" value={values.email} onChange={handleChange} placeholder="name@college.edu" />)}
        {field("course", "Course",
          <select id="course" name="course" className="input" value={values.course} onChange={handleChange}>
            <option value="">Select course</option>
            {courses.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>)}
        {field("semester", "Semester",
          <select id="semester" name="semester" className="input" value={values.semester} onChange={handleChange}>
            <option value="">Select semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>)}
        {field("gender", "Gender",
          <select id="gender" name="gender" className="input" value={values.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>)}
        {field("attendance", "Attendance (%)", <input id="attendance" name="attendance" type="number" min="0" max="100" className="input" value={values.attendance} onChange={handleChange} placeholder="0 – 100" />)}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          <UserPlus size={14} strokeWidth={2} />
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
        {editingStudent && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            <X size={14} strokeWidth={2} />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
