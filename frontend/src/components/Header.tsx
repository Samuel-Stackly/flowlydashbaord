import { useEffect, useRef, useState } from "react";
import {
  Search,
  Sun,
  Moon,
  Bell,
  MessageCircle,
  Settings,
  LogOut,
  LogIn,
  User as UserIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, isGuest, logout } = useAuth();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
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
    <header className="topbar">
      <div className="topbar-search glass-card">
        <Search size={15} />
        <input placeholder="Search clients, deals, transactions..." />
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" onClick={() => setDark(false)} title="Light mode">
          <Sun size={16} />
        </button>
        <button className="icon-btn" onClick={() => setDark(true)} title="Dark mode">
          <Moon size={16} />
        </button>
        <button className="icon-btn" title="Notifications">
          <Bell size={16} />
          <span className="dot" />
        </button>
        <button className="icon-btn" title="Chat with AI">
          <MessageCircle size={16} />
        </button>

        <div className="topbar-avatar" ref={menuRef}>
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className=""
              style={{ borderRadius: "50%" }}
              onClick={() => setMenuOpen((v) => !v)}
            />
          ) : (
            <div className="avatar-fallback" onClick={() => setMenuOpen((v) => !v)}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}

          {menuOpen && (
            <div className="user-menu">
              <div className="user-menu-header">
                <strong>{user?.name || "Guest"}</strong>
                <span>{isGuest ? "Guest session" : user?.email || ""}</span>
              </div>
              <button className="user-menu-item" onClick={() => navigate("/settings")}>
                <UserIcon size={14} /> Profile
              </button>
              <button className="user-menu-item" onClick={() => navigate("/settings")}>
                <Settings size={14} /> Settings
              </button>
              {isGuest && (
                <button className="user-menu-item" onClick={() => navigate("/login")}>
                  <LogIn size={14} /> Log in to save account
                </button>
              )}
              <button className="user-menu-item danger" onClick={handleLogout}>
                <LogOut size={14} /> {isGuest ? "Reset guest session" : "Log out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
