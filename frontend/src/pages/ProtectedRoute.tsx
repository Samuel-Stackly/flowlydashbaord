import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { ProjectProvider } from "../context/ProjectContext";
import ConnectionError from "./ConnectionError";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, connectionError } = useAuth();

  if (loading) {
    return (
      <div className="center-screen">
        <div className="spinner" />
      </div>
    );
  }

  // Backend unreachable — show a clear connection error, not a login wall.
  if (!user && connectionError) {
    return <ConnectionError message={connectionError} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <ProjectProvider>{children}</ProjectProvider>;
}
