const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectRef = { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true };

/* Top stat cards: Total Revenue, MRR, Churn Rate, New Clients, NRR */
const metricSchema = new Schema(
  {
    project: projectRef,
    key: { type: String, required: true }, // e.g. "totalRevenue"
    label: { type: String, required: true },
    value: { type: String, required: true }, // display value e.g. "$ 12,450"
    changePercent: { type: Number, required: true }, // e.g. 10 or -8
    trend: { type: String, enum: ["up", "down"], required: true },
    footnote: { type: String, default: "" },
    icon: { type: String, default: "trending-up" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* Revenue & MRR Dynamics chart, per month */
const revenuePointSchema = new Schema(
  {
    project: projectRef,
    year: { type: Number, required: true },
    month: { type: String, required: true }, // "Jan".."Dec"
    revenue: { type: Number, required: true },
    forecast: { type: Number, default: null },
    newMrr: { type: Number, required: true },
    churnedMrr: { type: Number, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* AI Insights panel cards */
const insightSchema = new Schema(
  {
    project: projectRef,
    type: { type: String, enum: ["risk", "forecast", "opportunity"], default: "risk" },
    title: { type: String, required: true },
    body: { type: String, required: true },
    actionLabel: { type: String, default: "View" },
    severity: { type: String, enum: ["high", "medium", "low"], default: "medium" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* Client segmentation pie */
const clientSegmentSchema = new Schema(
  {
    project: projectRef,
    label: { type: String, required: true }, // Free, PRO, Enterprise
    percent: { type: Number, required: true },
    color: { type: String, default: "#8b5cf6" },
    note: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* Feature usage list with adoption bar */
const featureUsageSchema = new Schema(
  {
    project: projectRef,
    name: { type: String, required: true },
    changePercent: { type: Number, required: true },
    usagePercent: { type: Number, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* NPS / satisfaction breakdown */
const npsSchema = new Schema(
  {
    project: projectRef,
    score: { type: Number, required: true },
    promoters: { type: Number, required: true },
    passives: { type: Number, required: true },
    detractors: { type: Number, required: true },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

/* Conversion funnel stages */
const funnelStageSchema = new Schema(
  {
    project: projectRef,
    label: { type: String, required: true }, // Visitors, Signups, Trials, Paid
    value: { type: Number, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* Sales cycle stages (deal stages with avg days) */
const salesCycleStageSchema = new Schema(
  {
    project: projectRef,
    label: { type: String, required: true },
    days: { type: Number, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* Support tickets summary */
const supportTicketSchema = new Schema(
  {
    project: projectRef,
    status: { type: String, required: true }, // Open, Pending, Resolved
    count: { type: Number, required: true },
    color: { type: String, default: "#8b5cf6" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = {
  Metric: mongoose.model("Metric", metricSchema),
  RevenuePoint: mongoose.model("RevenuePoint", revenuePointSchema),
  Insight: mongoose.model("Insight", insightSchema),
  ClientSegment: mongoose.model("ClientSegment", clientSegmentSchema),
  FeatureUsage: mongoose.model("FeatureUsage", featureUsageSchema),
  Nps: mongoose.model("Nps", npsSchema),
  FunnelStage: mongoose.model("FunnelStage", funnelStageSchema),
  SalesCycleStage: mongoose.model("SalesCycleStage", salesCycleStageSchema),
  SupportTicket: mongoose.model("SupportTicket", supportTicketSchema),
};
