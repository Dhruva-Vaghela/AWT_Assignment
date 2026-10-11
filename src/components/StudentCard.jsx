import { memo } from "react";
import { useNavigate } from "@tanstack/react-router";
import AttendanceStatus, { getAttendanceStatus } from "./AttendanceStatus";
import { Pencil, Trash2 } from "lucide-react";

/*
 * MEMOIZED: StudentCard (React.memo)
 * Why: the Students page re-renders on every keystroke in the search box or the form.
 * What it avoids: rows whose `student` prop did not change are skipped instead of
 * re-rendering every row in the table each time parent state updates.
 * (onEdit / onDelete are stable because the parent wraps them in useCallback.)
 */
function StudentCard({ student, onEdit, onDelete }) {
  const navigate = useNavigate();
  const openDetails = () => navigate({ to: "/students/$id", params: { id: student.id } });

  const status = getAttendanceStatus(student.attendance);
  const barColor =
    status === "Eligible" ? "var(--cd-green)" :
    status === "Warning"  ? "var(--cd-amber)" : "var(--cd-red)";

  return (
    <tr className="clickable-row" onClick={openDetails}>
      <td>
        <div className="person">
          <span className="avatar">{student.name.charAt(0)}</span>
          <div>
            <strong style={{ fontSize: 13.5, display: "block", color: "var(--cd-ink)" }}>
              {student.name}
            </strong>
            <small>{student.email}</small>
          </div>
        </div>
      </td>
      <td style={{ color: "var(--cd-muted)", fontSize: 12.5, fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>
        {student.enrollment}
      </td>
      <td style={{ color: "var(--cd-ink-2)", fontSize: 13 }}>{student.course}</td>
      <td style={{ color: "var(--cd-muted)", fontSize: 13, fontWeight: 500 }}>{student.semester}</td>
      <td>
        <div className="progress-inline">
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${student.attendance}%`, background: barColor }}
            />
          </div>
          <span style={{ color: "var(--cd-ink-2)", fontWeight: 600 }}>{student.attendance}%</span>
        </div>
      </td>
      <td>
        <AttendanceStatus attendance={student.attendance} />
      </td>
      <td>
        {/* stopPropagation so action buttons don't trigger row navigation */}
        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => onEdit(student)}
            aria-label={`Edit ${student.name}`}
            title="Edit student"
          >
            <Pencil size={12} strokeWidth={2} />
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(student.id)}
            aria-label={`Delete ${student.name}`}
            title="Delete student"
          >
            <Trash2 size={12} strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default memo(StudentCard);
