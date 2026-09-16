const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    workspace: { type: String, default: "Flowly" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Free", "PRO", "Enterprise"], default: "PRO" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
