import { createFileRoute } from "@tanstack/react-router";
import Students from "../pages/Students";

export const Route = createFileRoute("/students/")({
  head: () => ({
    meta: [
      { title: "Students — College Management System" },
      { name: "description", content: "Add, edit, search and filter student records." },
      { property: "og:title", content: "Students — College Management System" },
      { property: "og:description", content: "Add, edit, search and filter student records." },
    ],
  }),
  component: Students,
});
