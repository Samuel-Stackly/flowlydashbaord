/**
 * Bootstraps a demo account so you can log in immediately:
 *   email:    demo@flowly.app
 *   password: demo1234
 *
 * Run with: npm run seed
 */
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Project = require("../models/Project");
const { seedProjectData } = require("./seedProjectData");

async function run() {
  await connectDB();

  const email = "demo@flowly.app";
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ name: "Demo User", email, password: "demo1234" });
    console.log("[seed] Created demo user:", email, "/ demo1234");
  } else {
    console.log("[seed] Demo user already exists:", email);
  }

  const existingProject = await Project.findOne({ owner: user._id });
  if (!existingProject) {
    const project = await Project.create({ name: "Main Workspace", owner: user._id });
    await seedProjectData(project._id);
    user.activeProject = project._id;
    await user.save();
    console.log("[seed] Created project 'Main Workspace' with demo data");
  } else {
    console.log("[seed] Project already exists, skipping data seed");
  }

  console.log("[seed] Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
