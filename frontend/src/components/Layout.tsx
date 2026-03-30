import { Outlet, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isDosen = user.role === "dosen";

  const menuItems = isDosen
    ? [
        { name: "Dashboard", path: "/dosen", icon: "⬡" },
        { name: "Pertemuan", path: "/dosen/courses", icon: "◈" },
      ]
    : [
        { name: "Dashboard", path: "/mahasiswa", icon: "⬡" },
        { name: "Matkul Saya", path: "/mahasiswa/courses", icon: "◈" },
      ];

  return (
    <div className="app-shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="app-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`app-sidebar ${sidebarOpen ? "app-sidebar--open" : ""} ${isDosen ? "app-sidebar--dosen" : "app-sidebar--mahasiswa"}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <Link to={`/${user.role}`} className="sidebar-logo__link">
            <span className="sidebar-logo__mark">⬡</span>
            <div className="sidebar-logo__info">
              <span className="sidebar-logo__name">OpenClaw</span>
              <span className={`sidebar-logo__role ${isDosen ? "sidebar-logo__role--dosen" : "sidebar-logo__role--mahasiswa"}`}>
                {isDosen ? "Mode Dosen" : "Mode Mahasiswa"}
              </span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <span className="sidebar-nav__label">Menu</span>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-nav__item ${active ? "sidebar-nav__item--active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sidebar-nav__icon">{item.icon}</span>
                <span className="sidebar-nav__text">{item.name}</span>
                {active && <span className="sidebar-nav__dot" />}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="sidebar-user">
          <div className="sidebar-user__avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user__info">
            <span className="sidebar-user__name">{user.name}</span>
            <span className="sidebar-user__role">{user.role}</span>
          </div>
          <button onClick={handleLogout} className="sidebar-user__logout" title="Logout">
            ⇥
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="app-main">
        {/* Top header */}
        <header className="app-header">
          {/* Mobile hamburger */}
          <button
            className="app-header__hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <span /><span /><span />
          </button>

          <div className="app-header__breadcrumb">
            <span className="app-header__portal">{isDosen ? "Dosen" : "Mahasiswa"} Portal</span>
            <span className="app-header__sep">/</span>
            <span className="app-header__page">
              {menuItems.find(m => m.path === location.pathname)?.name ?? "…"}
            </span>
          </div>

          <div className="app-header__right">
            <div className="app-header__user">
              <div className={`app-header__avatar ${isDosen ? "app-header__avatar--dosen" : "app-header__avatar--mahasiswa"}`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="app-header__name">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}