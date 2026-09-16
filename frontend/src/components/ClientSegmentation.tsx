import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ClientSegment } from "../types";

export default function ClientSegmentation({ segments }: { segments: ClientSegment[] }) {
  const note = segments.find((s) => s.note)?.note;

  return (
    <div className="glass-card panel">
      <div className="panel-head">
        <h3>Client Segmentation</h3>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginBottom: 10 }}>
        Distribution by subscription plan
      </div>

      <div className="segment-body">
        <div style={{ width: 110, height: 110, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                dataKey="percent"
                nameKey="label"
                innerRadius={30}
                outerRadius={52}
                paddingAngle={2}
                stroke="none"
              >
                {segments.map((s) => (
                  <Cell key={s._id} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="segment-legend">
          {segments.map((s) => (
            <div className="segment-legend-row" key={s._id}>
              <span className="legend-dot" style={{ background: s.color }} />
              {s.label}
              <strong>{s.percent}%</strong>
            </div>
          ))}
        </div>
      </div>

      {note && <div className="panel-note">{note}</div>}
    </div>
  );
}
