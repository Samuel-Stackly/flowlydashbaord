import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import api from "../api/client";
import { Project } from "../types";
import { useAuth } from "./AuthContext";

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  loading: boolean;
  refreshProjects: () => Promise<void>;
  createProject: (name: string) => Promise<Project>;
  switchProject: (projectId: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { user, setUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setActiveProject(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get("/projects");
      const list: Project[] = res.data.projects;
      setProjects(list);
      const activeId = res.data.activeProject;
      const found = list.find((p) => p._id === activeId) || list[0] || null;
      setActiveProject(found);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  async function createProject(name: string) {
    const res = await api.post("/projects", { name });
    const project: Project = res.data.project;
    setProjects((prev) => [...prev, project]);
    setActiveProject(project);
    if (user) setUser({ ...user, activeProject: project._id });
    return project;
  }

  async function switchProject(projectId: string) {
    const res = await api.patch(`/projects/${projectId}/activate`);
    const project: Project = res.data.project;
    setActiveProject(project);
    if (user) setUser({ ...user, activeProject: project._id });
  }

  return (
    <ProjectContext.Provider
      value={{ projects, activeProject, loading, refreshProjects, createProject, switchProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
}
