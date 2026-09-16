import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "../api/client";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  connectionError: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (u: User | null) => void;
  retryConnection: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function startGuestSession(): Promise<User> {
  // Reuses the same guest workspace on this browser if one already exists,
  // otherwise the backend creates a brand-new one with seeded demo data.
  const guestId = localStorage.getItem("flowly_guest_id") || undefined;
  const res = await api.post("/auth/guest", { guestId });
  localStorage.setItem("flowly_token", res.data.token);
  localStorage.setItem("flowly_user", JSON.stringify(res.data.user));
  localStorage.setItem("flowly_guest_id", res.data.guestId);
  localStorage.setItem("flowly_is_guest", "true");
  return res.data.user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("flowly_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem("flowly_is_guest") === "true");
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  function retryConnection() {
    setConnectionError(null);
    setLoading(true);
    setRetryCount((c) => c + 1);
  }

  useEffect(() => {
    const token = localStorage.getItem("flowly_token");

    if (token) {
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data.user);
          setConnectionError(null);
          localStorage.setItem("flowly_user", JSON.stringify(res.data.user));
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            // Token is invalid/expired — fall back to a fresh guest session.
            return startGuestSession()
              .then((u) => {
                setUser(u);
                setIsGuest(true);
                setConnectionError(null);
              })
              .catch(() => {
                setUser(null);
                setConnectionError(
                  "Can't reach the Flowly API. Make sure the backend server is running."
                );
              });
          }
          setUser(null);
          setConnectionError(
            "Can't reach the Flowly API. Make sure the backend server is running."
          );
        })
        .finally(() => setLoading(false));
      return;
    }

    // No session at all yet — open the app directly with a guest workspace
    // instead of showing a login wall.
    startGuestSession()
      .then((u) => {
        setUser(u);
        setIsGuest(true);
        setConnectionError(null);
      })
      .catch(() => {
        setUser(null);
        setConnectionError(
          "Can't reach the Flowly API. Make sure the backend server is running on port 5000 and MongoDB is connected."
        );
      })
      .finally(() => setLoading(false));
  }, [retryCount]);

  async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("flowly_token", res.data.token);
    localStorage.setItem("flowly_user", JSON.stringify(res.data.user));
    localStorage.removeItem("flowly_is_guest");
    setIsGuest(false);
    setUser(res.data.user);
  }

  async function register(name: string, email: string, password: string) {
    const res = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("flowly_token", res.data.token);
    localStorage.setItem("flowly_user", JSON.stringify(res.data.user));
    localStorage.removeItem("flowly_is_guest");
    setIsGuest(false);
    setUser(res.data.user);
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore network errors on logout
    }
    localStorage.removeItem("flowly_token");
    localStorage.removeItem("flowly_user");
    localStorage.removeItem("flowly_guest_id");
    localStorage.removeItem("flowly_is_guest");

    // Logging out never dead-ends on a blank login wall — it drops you
    // straight back into a fresh guest workspace.
    try {
      const u = await startGuestSession();
      setUser(u);
      setIsGuest(true);
    } catch {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isGuest, connectionError, login, register, logout, setUser, retryConnection }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
