const app = require("../server");
const connectDB = require("../src/config/db");

let databaseConnection;

module.exports = async (req, res) => {
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