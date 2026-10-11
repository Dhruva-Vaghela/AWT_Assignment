import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "../pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — College Management System" },
      { name: "description", content: "Student, course and attendance statistics at a glance." },
      { property: "og:title", content: "Dashboard — College Management System" },
      { property: "og:description", content: "Student, course and attendance statistics at a glance." },
    ],
  }),
  component: Dashboard,
});
