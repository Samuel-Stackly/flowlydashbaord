const Project = require("../models/Project");
const User = require("../models/User");
const { seedProjectData } = require("../seed/seedProjectData");

/* GET /api/projects */
async function listProjects(req, res) {
  const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: 1 });
  res.json({ projects, activeProject: req.user.activeProject });
}

/* POST /api/projects  { name } */
async function createProject(req, res) {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({ name: name.trim(), owner: req.user._id });
    await seedProjectData(project._id);

    req.user.activeProject = project._id;
    await req.user.save();

    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ message: "Could not create project", error: err.message });
  }
}

/* PATCH /api/projects/:id/activate */
async function activateProject(req, res) {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });
    if (!project) return res.status(404).json({ message: "Project not found" });

    req.user.activeProject = project._id;
    await req.user.save();

    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: "Could not switch project", error: err.message });
  }
}

module.exports = { listProjects, createProject, activateProject };
