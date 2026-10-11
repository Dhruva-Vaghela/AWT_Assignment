import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/courses", label: "Courses", icon: BookOpen },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/dashboard" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-logo" aria-hidden="true">
            <GraduationCap size={16} strokeWidth={2.5} />
          </span>
          <span>CampusDesk</span>
        </Link>

        {/* Desktop nav */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={14} strokeWidth={2} className="nav-link-icon" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
