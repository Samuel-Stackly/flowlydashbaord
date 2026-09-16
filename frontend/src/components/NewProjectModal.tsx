import { useState } from "react";
import { useProjects } from "../context/ProjectContext";

export default function NewProjectModal({ onClose }: { onClose: () => void }) {
  const { createProject } = useProjects();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!name.trim()) {
      setError("Please enter a project name");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createProject(name.trim());
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Create new project</div>
        <div className="modal-subtitle">
          Spin up a fresh workspace with its own live dashboard data.
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="field">
          <label>Project name</label>
          <input
            autoFocus
            placeholder="e.g. Q4 Growth Workspace"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
