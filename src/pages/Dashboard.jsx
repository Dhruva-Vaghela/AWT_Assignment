import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useCollege } from "../context/CollegeContext";
import DashboardCard from "../components/DashboardCard";
import AttendanceStatus, { getAttendanceStatus } from "../components/AttendanceStatus";
import {
  Users,
  BookOpen,
  CheckCircle2,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Greeting based on time of day
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// Custom tooltip for recharts
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8eaf0",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 12,
      boxShadow: "0 4px 12px rgba(14,17,23,0.08)",
    }}>
      {label && <p style={{ color: "#8891a4", marginBottom: 4, fontWeight: 600 }}>{label}</p>}
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color || "#0e1117", fontWeight: 600 }}>
          {p.name}: {p.value}{p.name === "Avg Attendance" ? "%" : ""}
        </p>
      ))}
    </div>
  );
};

function Dashboard() {
  const { students, courses } = useCollege();

  const stats = useMemo(() => {
    const totalAttendance = students.reduce((sum, s) => sum + Number(s.attendance), 0);
    const eligible = students.filter((s) => getAttendanceStatus(s.attendance) === "Eligible").length;
    const warning = students.filter((s) => getAttendanceStatus(s.attendance) === "Warning").length;
    const detained = students.filter((s) => getAttendanceStatus(s.attendance) === "Detained").length;
    return {
      totalStudents: students.length,
      totalCourses: courses.length,
      activeCourses: courses.filter((c) => c.status === "Active").length,
      averageAttendance: students.length ? Math.round(totalAttendance / students.length) : 0,
      eligible,
      warning,
      detained,
    };
  }, [students, courses]);

  // Donut chart data
  const donutData = [
    { name: "Eligible", value: stats.eligible,  color: "#16a34a" },
    { name: "Warning",  value: stats.warning,   color: "#d97706" },
    { name: "Detained", value: stats.detained,  color: "#dc2626" },
  ].filter((d) => d.value > 0);

  // Per-course average attendance for bar chart
  const courseAttendance = useMemo(() => {
    return courses
      .filter((c) => c.status === "Active")
      .map((c) => {
        const enrolled = students.filter((s) => s.course === c.name);
        const avg = enrolled.length
          ? Math.round(enrolled.reduce((sum, s) => sum + Number(s.attendance), 0) / enrolled.length)
          : 0;
        // Shorten name for display
        const shortName = c.code || c.name.split(" ").slice(0, 2).join(" ");
        return { name: shortName, "Avg Attendance": avg, enrolled: enrolled.length };
      })
      .filter((c) => c.enrolled > 0);
  }, [courses, students]);

  const recentStudents = students.slice(-5).reverse();
  const hasAttentionItems = stats.warning > 0 || stats.detained > 0;

  return (
    <div className="page">
      {/* ---- Header ---- */}
      <div className="page-header fade-up">
        <div className="page-header-left">
          <div className="page-eyebrow">
            <span className="page-eyebrow-dot" />
            Analytics Dashboard
          </div>
          <h1>{getGreeting()}, Welcome back 👋</h1>
          <p className="page-subtitle">
            Here's what's happening across your campus today.
          </p>
        </div>
      </div>

      {/* ---- Stat Cards ---- */}
      <div className="stats-grid">
        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="blue"
          sub={`${stats.eligible} eligible for exams`}
        />
        <DashboardCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          color="indigo"
          sub={`${stats.activeCourses} active`}
        />
        <DashboardCard
          title="Active Courses"
          value={stats.activeCourses}
          icon={CheckCircle2}
          color="green"
          sub={`${stats.totalCourses - stats.activeCourses} inactive`}
        />
        <DashboardCard
          title="Avg Attendance"
          value={`${stats.averageAttendance}%`}
          icon={BarChart3}
          color="amber"
          sub="across all students"
        />
      </div>

      {/* ---- Analytics Section ---- */}
      <div className="analytics-grid fade-up stagger-2">
        {/* Attendance Distribution Donut */}
        {donutData.length > 0 && (
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2>Attendance Distribution</h2>
                <span className="panel-subtitle">Student status breakdown</span>
              </div>
            </div>
            <div className="attendance-donut-wrap">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                    animationBegin={0}
                    animationDuration={700}
                  >
                    {donutData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-legend">
                {donutData.map((entry) => (
                  <div key={entry.name} className="donut-legend-item">
                    <span className="donut-legend-dot" style={{ background: entry.color }} />
                    <span className="donut-legend-label">{entry.name}</span>
                    <span className="donut-legend-value">{entry.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #e8eaf0" }}>
                  <div className="donut-legend-item">
                    <span className="donut-legend-dot" style={{ background: "#e8eaf0" }} />
                    <span className="donut-legend-label" style={{ color: "#8891a4" }}>Total</span>
                    <span className="donut-legend-value">{stats.totalStudents}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Attendance Bar Chart */}
        {courseAttendance.length > 0 && (
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <h2>Course Attendance</h2>
                <span className="panel-subtitle">Average % by active course</span>
              </div>
            </div>
            <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={courseAttendance} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8eaf0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#8891a4", fontFamily: "Inter, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: "#8891a4", fontFamily: "Inter, sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                    width={36}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f4f5f8", radius: 6 }} />
                  <Bar
                    dataKey="Avg Attendance"
                    fill="#4f46e5"
                    radius={[5, 5, 0, 0]}
                    animationBegin={0}
                    animationDuration={700}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* ---- Attention Banner ---- */}
      {hasAttentionItems && (
        <div className="attention-banner fade-up stagger-3">
          <div className="attention-icon">
            <AlertTriangle size={18} strokeWidth={2} />
          </div>
          <div className="attention-body">
            <p className="attention-title">Attendance Attention Required</p>
            <p style={{ fontSize: 12, color: "#8891a4", marginBottom: "0.5rem" }}>
              The following students need immediate follow-up.
            </p>
            <div className="attention-items">
              {stats.warning > 0 && (
                <span className="attention-chip">
                  <span className="attention-chip-dot" style={{ background: "#d97706" }} />
                  {stats.warning} student{stats.warning > 1 ? "s" : ""} on warning
                </span>
              )}
              {stats.detained > 0 && (
                <span className="attention-chip">
                  <span className="attention-chip-dot" style={{ background: "#dc2626" }} />
                  {stats.detained} student{stats.detained > 1 ? "s" : ""} detained
                </span>
              )}
            </div>
          </div>
          <Link to="/students" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
            View <ArrowRight size={12} />
          </Link>
        </div>
      )}

      {/* ---- Recent Students ---- */}
      <div className="panel fade-up stagger-4">
        <div className="panel-header">
          <div className="panel-title-group">
            <h2>
              Recent Students
              <span className="count">{recentStudents.length}</span>
            </h2>
            <span className="panel-subtitle">Last {recentStudents.length} enrolled</span>
          </div>
          <Link to="/students" className="btn btn-outline btn-sm">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {recentStudents.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">
              <Users size={22} strokeWidth={1.5} />
            </div>
            <p>No students found.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Attendance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => {
                  const status = getAttendanceStatus(s.attendance);
                  const barColor =
                    status === "Eligible" ? "var(--cd-green)" :
                    status === "Warning"  ? "var(--cd-amber)" : "var(--cd-red)";
                  return (
                    <tr key={s.id} className="clickable-row" onClick={() => {}}>
                      <td>
                        <Link to="/students/$id" params={{ id: s.id }} className="person">
                          <span className="avatar">{s.name.charAt(0)}</span>
                          <div>
                            <strong style={{ fontSize: 13.5, display: "block", color: "var(--cd-ink)" }}>
                              {s.name}
                            </strong>
                            <small>{s.email}</small>
                          </div>
                        </Link>
                      </td>
                      <td style={{ color: "var(--cd-ink-2)", fontSize: 13 }}>{s.course}</td>
                      <td style={{ color: "var(--cd-muted)", fontSize: 13 }}>Sem {s.semester}</td>
                      <td>
                        <div className="progress-inline">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${s.attendance}%`, background: barColor }}
                            />
                          </div>
                          <span style={{ color: "var(--cd-ink-2)" }}>{s.attendance}%</span>
                        </div>
                      </td>
                      <td>
                        <AttendanceStatus attendance={s.attendance} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
