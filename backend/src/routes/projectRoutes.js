const express = require("express");
const { listProjects, createProject, activateProject } = require("../controllers/projectController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);
router.get("/", listProjects);
router.post("/", createProject);
router.patch("/:id/activate", activateProject);

module.exports = router;
