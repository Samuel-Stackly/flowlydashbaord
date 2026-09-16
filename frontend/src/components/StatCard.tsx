import {
  DollarSign,
  Repeat,
  TrendingDown,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
} from "lucide-react";
import { Metric } from "../types";

const ICONS: Record<string, React.ElementType> = {
  "dollar-sign": DollarSign,
  repeat: Repeat,
  "trending-down": TrendingDown,
  users: Users,
  activity: Activity,
};

export default function StatCard({ metric }: { metric: Metric }) {
  const Icon = ICONS[metric.icon] || Activity;
  const isUp = metric.trend === "up";

  return (
    <div className="glass-card stat-card">
      <div className="stat-card-top">
        <Icon size={15} />
        {metric.label}
      </div>
      <div className="stat-card-value">
        {metric.value}
        <span className={`badge ${isUp ? "up" : "down"}`}>
          {isUp ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {isUp ? "+" : ""}
          {metric.changePercent}%
        </span>
      </div>
      <div className="stat-card-foot">
        {metric.footnote}
        <ChevronRight size={13} />
      </div>
    </div>
  );
}
