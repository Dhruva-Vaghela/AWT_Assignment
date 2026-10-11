import { createContext, useContext, useState } from "react";
import initialStudents from "../data/students";
import initialCourses from "../data/courses";

// Shared React state for students and courses so every page sees the same CRUD changes.
const CollegeContext = createContext(null);

export function CollegeProvider({ children }) {
  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);

  // ---------- Student CRUD ----------
  const addStudent = (student) =>
    setStudents((prev) => [...prev, { ...student, id: `s${Date.now()}`, subjects: [] }]);

  const updateStudent = (updated) =>
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)));

  const deleteStudent = (id) => setStudents((prev) => prev.filter((s) => s.id !== id));

  // ---------- Course CRUD ----------
  const addCourse = (course) => setCourses((prev) => [...prev, { ...course, id: `c${Date.now()}` }]);

  const deleteCourse = (id) => setCourses((prev) => prev.filter((c) => c.id !== id));

  const value = { students, courses, addStudent, updateStudent, deleteStudent, addCourse, deleteCourse };
  return <CollegeContext.Provider value={value}>{children}</CollegeContext.Provider>;
}

export function useCollege() {
  return useContext(CollegeContext);
}
