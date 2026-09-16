const mongoose = require("mongoose");

function redactMongoUri(uri) {
  try {
    const parsed = new URL(uri);
    if (parsed.username || parsed.password) {
      parsed.username = "***";
      parsed.password = "***";
    }
    return parsed.toString();
  } catch {
    return "[redacted MongoDB URI]";
  }
}

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/flowly";
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("[db] MongoDB connected:", redactMongoUri(uri));
  } catch (err) {
    throw new Error(
      `[db] MongoDB connection failed for ${redactMongoUri(uri)}. Start MongoDB or set MONGO_URI in backend/.env. ${err.message}`
    );
  }
}

module.exports = connectDB;
