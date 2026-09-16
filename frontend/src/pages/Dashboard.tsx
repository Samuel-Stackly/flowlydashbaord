import { useEffect, useState } from "react";
import api from "../api/client";
import { useProjects } from "../context/ProjectContext";
import { DashboardData } from "../types";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import AIInsightsPanel from "../components/AIInsightsPanel";
import ClientSegmentation from "../components/ClientSegmentation";
import FeatureUsagePanel from "../components/FeatureUsagePanel";
import NpsPanel from "../components/NpsPanel";
import ConversionFunnel from "../components/ConversionFunnel";
import SalesCyclePanel from "../components/SalesCyclePanel";
import SupportTicketsPanel from "../components/SupportTicketsPanel";

export default function Dashboard() {
  const { activeProject, loading: projectsLoading } = useProjects();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!activeProject) return;
    setLoading(true);
    api
      .get(`/dashboard/${activeProject._id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err?.response?.data?.message || "Could not load dashboard"))
      .finally(() => setLoading(false));
  }, [activeProject]);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-col">
        <Header />

        {(loading || projectsLoading) && (
          <div className="center-screen" style={{ minHeight: "60vh" }}>
            <div className="spinner" />
          </div>
        )}

        {!loading && error && <div className="auth-error">{error}</div>}

        {!loading && !error && data && (
          <>
            <div className="stat-grid">
              {data.metrics.map((m) => (
                <StatCard key={m._id} metric={m} />
              ))}
            </div>

            <div className="content-grid">
              <RevenueChart data={data.revenue} year={data.revenue[0]?.year || 2025} />
              <AIInsightsPanel insights={data.insights} />
            </div>

            <div className="row-3">
              <ClientSegmentation segments={data.segments} />
              <FeatureUsagePanel features={data.features} />
              <NpsPanel nps={data.nps} />
            </div>

            <div className="row-3 bottom">
              <ConversionFunnel funnel={data.funnel} />
              <SalesCyclePanel stages={data.salesCycle} />
              <SupportTicketsPanel tickets={data.tickets} />
            </div>
          </>
        )}

        {!loading && !projectsLoading && !activeProject && (
          <div className="glass-card panel">
            No project yet — create one from the sidebar to get started.
          </div>
        )}
      </div>
    </div>
  );
}
