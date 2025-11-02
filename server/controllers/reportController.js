const Report = require('../models/Report');

// @desc Create a new report
// @route POST /api/reports
// @access Private
const createReport = async (req, res) => {
  try {
    const {reportedEmail, description } = req.body;

    if (!reportedEmail || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const report = await Report.create({
      reportedEmail,
      description,
    });

    res.status(201).json({
      message: 'Report created successfully',
      report,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all reports (for admin)
// @route GET /api/reports
// @access Private/Admin
const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createReport, getReports };
