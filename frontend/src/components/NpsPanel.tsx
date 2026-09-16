import { Nps } from "../types";

export default function NpsPanel({ nps }: { nps: Nps | null }) {
  if (!nps) return null;

  return (
    <div className="glass-card panel">
      <div className="panel-head">
        <h3>Customer Satisfaction / NPS</h3>
      </div>

      <div className="nps-score">{nps.score}</div>

      <div className="nps-bar">
        <div style={{ width: `${nps.promoters}%`, background: "#1fa15a" }} />
        <div style={{ width: `${nps.passives}%`, background: "#f2b53c" }} />
        <div style={{ width: `${nps.detractors}%`, background: "#e2483d" }} />
      </div>

      <div className="nps-legend">
        <span>
          <span className="legend-dot" style={{ background: "#1fa15a", borderRadius: "50%" }} />
          Promoters {nps.promoters}%
        </span>
        <span>
          <span className="legend-dot" style={{ background: "#f2b53c", borderRadius: "50%" }} />
          Passives {nps.passives}%
        </span>
        <span>
          <span className="legend-dot" style={{ background: "#e2483d", borderRadius: "50%" }} />
          No {nps.detractors}%
        </span>
      </div>

      <div className="panel-note">{nps.note}</div>
    </div>
  );
}
