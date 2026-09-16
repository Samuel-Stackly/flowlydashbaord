export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  activeProject?: string | null;
}

export interface Project {
  _id: string;
  name: string;
  workspace: string;
  plan: "Free" | "PRO" | "Enterprise";
  owner: string;
  createdAt: string;
}

export interface Metric {
  _id: string;
  key: string;
  label: string;
  value: string;
  changePercent: number;
  trend: "up" | "down";
  footnote: string;
  icon: string;
}

export interface RevenuePoint {
  _id: string;
  year: number;
  month: string;
  revenue: number;
  forecast: number | null;
  newMrr: number;
  churnedMrr: number;
}

export interface Insight {
  _id: string;
  type: "risk" | "forecast" | "opportunity";
  title: string;
  body: string;
  actionLabel: string;
  severity: "high" | "medium" | "low";
}

export interface ClientSegment {
  _id: string;
  label: string;
  percent: number;
  color: string;
  note?: string;
}

export interface FeatureUsage {
  _id: string;
  name: string;
  changePercent: number;
  usagePercent: number;
}

export interface Nps {
  _id: string;
  score: number;
  promoters: number;
  passives: number;
  detractors: number;
  note: string;
}

export interface FunnelStage {
  _id: string;
  label: string;
  value: number;
}

export interface SalesCycleStage {
  _id: string;
  label: string;
  days: number;
}

export interface SupportTicket {
  _id: string;
  status: string;
  count: number;
  color: string;
}

export interface DashboardData {
  project: Project;
  metrics: Metric[];
  revenue: RevenuePoint[];
  insights: Insight[];
  segments: ClientSegment[];
  features: FeatureUsage[];
  nps: Nps | null;
  funnel: FunnelStage[];
  salesCycle: SalesCycleStage[];
  tickets: SupportTicket[];
}
