import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-col">
        <Header />
        <div className="glass-card panel" style={{ minHeight: 300 }}>
          <div className="panel-head">
            <h3>{title}</h3>
          </div>
          <p style={{ color: "var(--ink-soft)", fontSize: 13.5, lineHeight: 1.6 }}>
            This section is part of the Flowly navigation and is ready for its own dynamic
            widgets — wire it up to a new backend endpoint the same way the Dashboard page
            consumes <code>/api/dashboard/:projectId</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
