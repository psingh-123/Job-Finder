const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Job = require('../models/Job');
const { protect } = require('../middleware/authMiddleware');

// 📝 Submit a report
router.post('/', protect, async (req, res) => {
  try {
    const { reportedUser, reportedJob, reason, role } = req.body;

    if (!reason || !role) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const report = await Report.create({
      reporter: req.user._id,
      reportedUser,
      reportedJob,
      reason,
      role,
    });

    res.status(201).json({ message: 'Report submitted', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// 👀 Admin: View all reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reportedJob', 'title companyName')
      .populate('reportedUser', 'name email')
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Admin: Delete abusive job
router.delete('/reports/job/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    await Job.findByIdAndDelete(jobId);
    await Report.deleteMany({ reportedJob: jobId });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
