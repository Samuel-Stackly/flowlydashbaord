const app = require("../server");
const connectDB = require("../src/config/db");

let databaseConnection;

function createHandler(routePrefix) {
  return async (req, res) => {
    const originalUrl = req.url.startsWith("/") ? req.url : `/${req.url}`;
    req.url = `/api/${routePrefix}${originalUrl}`;

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
}

module.exports = { createHandler };