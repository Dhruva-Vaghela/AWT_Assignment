function DashboardCard({ title, value, icon: Icon, color, sub }) {
  return (
    <div className={`stat-card stat-${color} fade-up`}>
      <div className="stat-header">
        <div>
          <p className="stat-title">{title}</p>
          <h3 className="stat-value">{value}</h3>
          {sub && (
            <p className="stat-sub">
              <span className="stat-sub-dot" />
              {sub}
            </p>
          )}
        </div>
        <div className="stat-icon-wrap" aria-hidden="true">
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
