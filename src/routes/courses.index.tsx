import { createFileRoute } from "@tanstack/react-router";
import Courses from "../pages/Courses";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses — College Management System" },
      { name: "description", content: "Browse, add, search and filter college courses." },
      { property: "og:title", content: "Courses — College Management System" },
      { property: "og:description", content: "Browse, add, search and filter college courses." },
    ],
  }),
  component: Courses,
});
