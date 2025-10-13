// models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }, // optional if abuse relates to a job
    reason: { type: String, required: true },
    status: { type: String, default: "pending" }, // pending, resolved
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
