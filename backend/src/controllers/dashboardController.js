const Project = require("../models/Project");
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

/* GET /api/dashboard/:projectId */
async function getDashboard(req, res) {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({ _id: projectId, owner: req.user._id });
    if (!project) return res.status(404).json({ message: "Project not found" });

    const [metrics, revenue, insights, segments, features, nps, funnel, salesCycle, tickets] =
      await Promise.all([
        Metric.find({ project: projectId }).sort({ order: 1 }),
        RevenuePoint.find({ project: projectId }).sort({ order: 1 }),
        Insight.find({ project: projectId }).sort({ order: 1 }),
        ClientSegment.find({ project: projectId }).sort({ order: 1 }),
        FeatureUsage.find({ project: projectId }).sort({ order: 1 }),
        Nps.findOne({ project: projectId }),
        FunnelStage.find({ project: projectId }).sort({ order: 1 }),
        SalesCycleStage.find({ project: projectId }).sort({ order: 1 }),
        SupportTicket.find({ project: projectId }).sort({ order: 1 }),
      ]);

    res.json({
      project,
      metrics,
      revenue,
      insights,
      segments,
      features,
      nps,
      funnel,
      salesCycle,
      tickets,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not load dashboard", error: err.message });
  }
}

module.exports = { getDashboard };
