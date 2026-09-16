import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Users,
  Package,
  Filter,
  Settings,
  Plug,
  LifeBuoy,
  Search,
  ChevronDown,
  Plus,
  Sparkles,
  LogOut,
  Check,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import NewProjectModal from "./NewProjectModal";

export default function Sidebar() {
  const { user, isGuest, logout } = useAuth();
  const { projects, activeProject, switchProject } = useProjects();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" ref={switcherRef} onClick={() => setSwitcherOpen((v) => !v)}>
        <div className="brand-mark">
          <Sparkles size={17} />
        </div>
        <div className="brand-text">
          <strong>Flowly</strong>
          <span>{activeProject?.name || "Project Manage..."}</span>
        </div>
        <ChevronDown size={16} className="brand-chevron" />

        {switcherOpen && (
          <div className="project-switcher" onClick={(e) => e.stopPropagation()}>
            {projects.map((p) => (
              <div
                key={p._id}
                className={`project-switcher-item ${activeProject?._id === p._id ? "active" : ""}`}
                onClick={() => {
                  switchProject(p._id);
                  setSwitcherOpen(false);
                }}
              >
                {activeProject?._id === p._id ? <Check size={14} /> : <Package size={14} />}
                {p.name}
              </div>
            ))}
            <div
              className="project-switcher-new"
              onClick={() => {
                setSwitcherOpen(false);
                setModalOpen(true);
              }}
            >
              <Plus size={14} /> New Project
            </div>
          </div>
        )}
      </div>

      <div className="sidebar-search">
        <Search size={14} />
        <input placeholder="Search clients, deals, transactions..." />
      </div>

      <nav>
        <div className="nav-section">
          <div className="nav-section-label">Main</div>
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>
          <NavLink to="/revenue" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Wallet size={16} /> Revenue
          </NavLink>
          <NavLink
            to="/customer-analytics"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <Users size={16} /> Customer Analytics
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-label">Analytics</div>
          <NavLink to="/product" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Package size={16} /> Product
          </NavLink>
          <NavLink to="/sales-funnel" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Filter size={16} /> Sales &amp; Funnel
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-section-label">Support</div>
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Settings size={16} /> Settings
          </NavLink>
          <NavLink to="/integrations" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Plug size={16} /> Integrations
          </NavLink>
          <NavLink to="/support" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <LifeBuoy size={16} /> Support &amp; Success
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-spacer" />

      <button className="ai-hub-btn" onClick={() => navigate("/")}>
        <Sparkles size={15} /> AI Insight Hub
      </button>

      <div className="sidebar-user">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <div className="avatar-fallback">{user?.name?.[0]?.toUpperCase() || "U"}</div>
        )}
        <div className="sidebar-user-info">
          <strong>{user?.name || "Guest"}</strong>
          {isGuest ? (
            <span>
              Guest session —{" "}
              <NavLink to="/login" style={{ color: "var(--purple)", fontWeight: 600 }}>
                Log in
              </NavLink>
            </span>
          ) : (
            <span>{user?.email || ""}</span>
          )}
        </div>
        <button className="logout-btn" title="Log out" onClick={handleLogout}>
          <LogOut size={16} />
        </button>
      </div>

      {modalOpen && <NewProjectModal onClose={() => setModalOpen(false)} />}
    </aside>
  );
}
