import { createFileRoute } from "@tanstack/react-router";
import StudentDetails from "../pages/StudentDetails";

export const Route = createFileRoute("/students/$id")({
  head: () => ({
    meta: [
      { title: "Student Details — College Management System" },
      { name: "description", content: "Student profile with subject-wise attendance." },
      { property: "og:title", content: "Student Details — College Management System" },
      { property: "og:description", content: "Student profile with subject-wise attendance." },
    ],
  }),
  component: StudentDetailsRoute,
});

function StudentDetailsRoute() {
  const { id } = Route.useParams(); // dynamic route parameter
  return <StudentDetails id={id} />;
}
