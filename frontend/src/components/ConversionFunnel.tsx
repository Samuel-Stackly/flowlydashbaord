import { FunnelStage } from "../types";

export default function ConversionFunnel({ funnel }: { funnel: FunnelStage[] }) {
  const max = Math.max(...funnel.map((f) => f.value), 1);

  return (
    <div className="glass-card panel">
      <div className="panel-head">
        <h3>Conversion Funnel</h3>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginBottom: 16 }}>
        Visitors &rarr; Signups &rarr; Trials &rarr; Paid
      </div>

      {funnel.map((f) => (
        <div className="funnel-row" key={f._id}>
          <span className="funnel-label">{f.label}</span>
          <div className="funnel-bar-track">
            <div
              className="funnel-bar-fill"
              style={{ width: `${Math.max((f.value / max) * 100, 12)}%` }}
            >
              {f.value.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
