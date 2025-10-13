// routes/report.js
const express = require("express");
const Report = require("../models/Report");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/reports
router.post("/", protect, async (req, res) => {
  const { reportedUser, jobId, reason } = req.body;
  try {
    const report = await Report.create({
      reportedBy: req.user._id,
      reportedUser,
      jobId,
      reason,
    });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reportedBy", "name email")
      .populate("reportedUser", "name email")
      .populate("jobId", "title");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
