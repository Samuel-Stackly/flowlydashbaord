const {
  Metric,
  RevenuePoint,
  Insight,
  ClientSegment,
  FeatureUsage,
  Nps,
  FunnelStage,
  SalesCycleStage,
  SupportTicket,
} = require("../models/DashboardModels");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function rand(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

/**
 * Generates a full, self-consistent set of dashboard data for a project.
 * Numbers are randomised within realistic ranges on every call, so every
 * new project gets its own distinct, dynamic dataset (not a static clone).
 */
async function seedProjectData(projectId) {
  const totalRevenue = rand(9000, 16000);
  const mrr = rand(38000, 60000);
  const churn = (Math.random() * 3 + 1.5).toFixed(1);
  const newClients = rand(600, 950);
  const nrr = rand(100, 120);

  await Metric.insertMany([
    {
      project: projectId,
      key: "totalRevenue",
      label: "Total Revenue",
      value: `$ ${totalRevenue.toLocaleString()}`,
      changePercent: rand(4, 18),
      trend: "up",
      footnote: `Forecast: +${rand(10, 20)}% growth in the next quarter`,
      icon: "dollar-sign",
      order: 0,
    },
    {
      project: projectId,
      key: "mrr",
      label: "MRR",
      value: `$ ${mrr.toLocaleString()}`,
      changePercent: -rand(3, 12),
      trend: "down",
      footnote: "The main driver of growth is the PRO plan",
      icon: "repeat",
      order: 1,
    },
    {
      project: projectId,
      key: "churnRate",
      label: "Churn Rate",
      value: `${churn}%`,
      changePercent: -1.4,
      trend: "down",
      footnote: "Startups segment at risk of outflow: high",
      icon: "trending-down",
      order: 2,
    },
    {
      project: projectId,
      key: "newClients",
      label: "New Clients",
      value: `${newClients.toLocaleString()}`,
      changePercent: rand(5, 15),
      trend: "up",
      footnote: "The most new customers came from LinkedIn Ads",
      icon: "users",
      order: 3,
    },
    {
      project: projectId,
      key: "nrr",
      label: "NRR",
      value: `${nrr}%`,
      changePercent: rand(60, 110),
      trend: "up",
      footnote: "Expansion revenue is higher than outflow, which is a great...",
      icon: "activity",
      order: 4,
    },
  ]);

  const revenuePoints = MONTHS.map((month, i) => {
    const base = rand(8, 30) * 1000;
    return {
      project: projectId,
      year: 2025,
      month,
      revenue: base,
      forecast: i >= 7 ? base + rand(-2000, 6000) : null,
      newMrr: rand(2000, 18000),
      churnedMrr: rand(500, 6000),
      order: i,
    };
  });
  await RevenuePoint.insertMany(revenuePoints);

  await Insight.insertMany([
    {
      project: projectId,
      type: "risk",
      title: "High Risk",
      body: `${rand(2, 5)} clients (Enterprise Plan) have a high probability of churn within the next 30 days.`,
      actionLabel: "View Client",
      severity: "high",
      order: 0,
    },
    {
      project: projectId,
      type: "forecast",
      title: "Forecast",
      body: `Revenue in the Europe region expected to grow by next ${rand(1, 3)} months.`,
      actionLabel: "Open Forecast",
      severity: "medium",
      order: 1,
    },
  ]);

  await ClientSegment.insertMany([
    { project: projectId, label: "Free", percent: 20, color: "#c7bdfb", order: 0 },
    { project: projectId, label: "PRO", percent: 42, color: "#7c5cff", order: 1 },
    {
      project: projectId,
      label: "Enterprise",
      percent: 38,
      color: "#2f2260",
      note: "Expansion revenue is higher than outflow, which is a great signal",
      order: 2,
    },
  ]);

  await FeatureUsage.insertMany([
    { project: projectId, name: "Dashboard Export", changePercent: 10, usagePercent: 80, order: 0 },
    { project: projectId, name: "Team Collaboration", changePercent: 10, usagePercent: 70, order: 1 },
    { project: projectId, name: "AI Forecasting Tool", changePercent: 10, usagePercent: 47, order: 2 },
    { project: projectId, name: "Integration (API)", changePercent: 10, usagePercent: 30, order: 3 },
  ]);

  await Nps.create({
    project: projectId,
    score: rand(55, 75),
    promoters: 70,
    passives: 20,
    detractors: 10,
    note: "Most of the positive feedback comes from corporate users. Negative feedback is related to connecting the system to free.",
  });

  await FunnelStage.insertMany([
    { project: projectId, label: "Visitors", value: rand(8000, 15000), order: 0 },
    { project: projectId, label: "Signups", value: rand(3000, 7000), order: 1 },
    { project: projectId, label: "Trials", value: rand(1200, 3000), order: 2 },
    { project: projectId, label: "Paid", value: rand(400, 1200), order: 3 },
  ]);

  await SalesCycleStage.insertMany([
    { project: projectId, label: "Lead", days: rand(1, 4), order: 0 },
    { project: projectId, label: "Qualified", days: rand(3, 8), order: 1 },
    { project: projectId, label: "Proposal", days: rand(5, 12), order: 2 },
    { project: projectId, label: "Negotiation", days: rand(4, 10), order: 3 },
    { project: projectId, label: "Closed Won", days: rand(1, 5), order: 4 },
  ]);

  await SupportTicket.insertMany([
    { project: projectId, status: "Open", count: rand(10, 40), color: "#ef8b7a", order: 0 },
    { project: projectId, status: "Pending", count: rand(5, 25), color: "#f2c879", order: 1 },
    { project: projectId, status: "Resolved", count: rand(50, 150), color: "#7fd6a6", order: 2 },
  ]);
}

module.exports = { seedProjectData };
