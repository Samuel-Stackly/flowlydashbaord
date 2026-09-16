import { FeatureUsage } from "../types";

export default function FeatureUsagePanel({ features }: { features: FeatureUsage[] }) {
  return (
    <div className="glass-card panel">
      <div className="panel-head">
        <h3>Feature Usage</h3>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginBottom: 16 }}>
        Most used features last 30 days
      </div>

      {features.map((f) => (
        <div className="feature-row" key={f._id}>
          <span className="feature-name">{f.name}</span>
          <span className="badge up" style={{ flexShrink: 0 }}>
            +{f.changePercent}%
          </span>
          <div className="feature-bar-track">
            <div className="feature-bar-fill" style={{ width: `${f.usagePercent}%` }} />
          </div>
          <span className="feature-pct">{f.usagePercent}%</span>
        </div>
      ))}

      <div className="panel-note">Underutilized - potential for growth</div>
    </div>
  );
}
