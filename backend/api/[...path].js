const app = require("../server");
const connectDB = require("../src/config/db");

let databaseConnection;

module.exports = async (req, res) => {
  // Vercel removes the /api function prefix before invoking this handler,
  // while the Express routes are defined with /api prefixes.
  req.url = req.url.startsWith("/") ? req.url : `/${req.url}`;
  if (!req.url.startsWith("/api")) {
    req.url = `/api${req.url}`;
  }

  try {
    databaseConnection ||= connectDB();
    await databaseConnection;
  } catch (err) {
    databaseConnection = undefined;
    console.error(err.message);
    return res.status(503).json({ message: "Database unavailable" });
  }

  return app(req, res);
};