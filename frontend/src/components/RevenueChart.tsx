import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RevenuePoint } from "../types";

export default function RevenueChart({ data, year }: { data: RevenuePoint[]; year: number }) {
  const chartData = data.map((d) => ({
    month: d.month,
    Revenue: d.revenue,
    Forecast: d.forecast,
    "New MRR": d.newMrr,
    "Churned MRR": -d.churnedMrr,
  }));

  return (
    <div className="glass-card panel">
      <div className="panel-head">
        <h3>Revenue &amp; MRR Dynamics</h3>
        <select className="panel-select" defaultValue={year} disabled>
          <option value={year}>{year}</option>
        </select>
      </div>

      <div className="chart-legend">
        <span>
          <span className="legend-dot" style={{ background: "#7c5cff" }} /> Revenue
        </span>
        <span>
          <span className="legend-dot" style={{ background: "#b9a9ff" }} /> Forecast
        </span>
        <span>
          <span className="legend-dot" style={{ background: "#1fa15a" }} /> New MRR
        </span>
        <span>
          <span className="legend-dot" style={{ background: "#e2483d" }} /> Churned MRR
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,130,199,0.15)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9296b3" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9296b3" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid rgba(139,130,199,0.25)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="New MRR" fill="#1fa15a" radius={[4, 4, 0, 0]} maxBarSize={16} />
          <Bar dataKey="Churned MRR" fill="#e2483d" radius={[0, 0, 4, 4]} maxBarSize={16} />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke="#7c5cff"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Forecast"
            stroke="#b9a9ff"
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
