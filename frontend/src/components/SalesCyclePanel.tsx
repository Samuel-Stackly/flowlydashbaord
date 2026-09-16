import { SalesCycleStage } from "../types";

export default function SalesCyclePanel({ stages }: { stages: SalesCycleStage[] }) {
  const total = stages.reduce((sum, s) => sum + s.days, 0);

  return (
    <div className="glass-card panel">
      <div className="panel-head">
        <h3>Sales Cycle</h3>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginBottom: 6 }}>
        Average {total} days from lead to close
      </div>

      {stages.map((s) => (
        <div className="cycle-row" key={s._id}>
          <span>{s.label}</span>
          <span className="cycle-days">{s.days}d</span>
        </div>
      ))}
    </div>
  );
}
