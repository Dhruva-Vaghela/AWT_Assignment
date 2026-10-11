// Reusable attendance logic + badge.
// >= 75 => Eligible, < 75 => Warning, < 60 => Detained
export function getAttendanceStatus(attendance) {
  const value = Number(attendance);
  if (value >= 75) return "Eligible";
  if (value < 60) return "Detained";
  return "Warning";
}

function AttendanceStatus({ attendance }) {
  const status = getAttendanceStatus(attendance);
  return (
    <span className={`badge badge-${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

export default AttendanceStatus;
