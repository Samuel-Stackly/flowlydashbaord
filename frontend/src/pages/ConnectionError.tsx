import { WifiOff, RotateCw } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../api/client";

export default function ConnectionError({ message }: { message: string }) {
  const { retryConnection } = useAuth();

  return (
    <div className="auth-wrap">
      <div className="glass-card auth-card" style={{ textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "var(--red-bg)",
            color: "var(--red)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <WifiOff size={24} />
        </div>

        <div className="auth-title">Can&apos;t reach the server</div>
        <div className="auth-subtitle">{message}</div>

        <div className="demo-hint" style={{ textAlign: "left", marginBottom: 18 }}>
          Trying to reach: <strong>{API_BASE_URL}</strong>
          <br />
          <br />
          Check that the backend Render service is running and that its
          <strong> MONGO_URI</strong> and <strong>CLIENT_ORIGIN</strong> environment
          variables are configured.
        </div>

        <button className="btn-primary" onClick={retryConnection}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
            <RotateCw size={15} /> Retry connection
          </span>
        </button>
      </div>
    </div>
  );
}
