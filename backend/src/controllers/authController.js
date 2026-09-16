const User = require("../models/User");
const Project = require("../models/Project");
const generateToken = require("../utils/generateToken");
const { seedProjectData } = require("../seed/seedProjectData");

/* POST /api/auth/register */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password });

    // Every new user gets a default starter project with demo data,
    // so the dashboard is populated immediately after signup.
    const project = await Project.create({
      name: "Main Workspace",
      owner: user._id,
    });
    await seedProjectData(project._id);

    user.activeProject = project._id;
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token, user: user.toSafeObject(), project });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
}

/* POST /api/auth/login */
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.json({ token, user: user.toSafeObject() });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
}

/* POST /api/auth/guest
   Creates (or reuses) a lightweight guest account so the dashboard can be
   opened directly, with no login screen in the way. The frontend calls this
   automatically on first load and stores the returned token like any other
   session — the user can still log out and create/log into a real account
   at any time. */
async function guestLogin(req, res) {
  try {
    const { guestId } = req.body || {};

    let user = guestId ? await User.findOne({ email: `${guestId}@guest.flowly.app` }) : null;

    if (!user) {
      const id = guestId || `guest_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      user = await User.create({
        name: "Guest User",
        email: `${id}@guest.flowly.app`,
        password: Math.random().toString(36).slice(2, 12),
      });

      const project = await Project.create({ name: "Main Workspace", owner: user._id });
      await seedProjectData(project._id);

      user.activeProject = project._id;
      await user.save();
    }

    const token = generateToken(user._id);
    res.json({ token, user: user.toSafeObject(), guestId: user.email.split("@")[0] });
  } catch (err) {
    res.status(500).json({ message: "Could not start guest session", error: err.message });
  }
}

/* GET /api/auth/me */
async function me(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

/* POST /api/auth/logout - stateless JWT, client just discards the token */
async function logout(req, res) {
  res.json({ message: "Logged out successfully" });
}

module.exports = { register, login, me, logout, guestLogin };
