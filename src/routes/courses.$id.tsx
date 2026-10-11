import { createFileRoute } from "@tanstack/react-router";
import CourseDetails from "../pages/CourseDetails";

export const Route = createFileRoute("/courses/$id")({
  head: () => ({
    meta: [
      { title: "Course Details — College Management System" },
      { name: "description", content: "Course information and enrolled students." },
      { property: "og:title", content: "Course Details — College Management System" },
      { property: "og:description", content: "Course information and enrolled students." },
    ],
  }),
  component: CourseDetailsRoute,
});

function CourseDetailsRoute() {
  const { id } = Route.useParams(); // dynamic route parameter
  return <CourseDetails id={id} />;
}
