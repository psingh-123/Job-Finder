const express = require('express');
const router = express.Router();
const { createReport, getReports } = require('../controllers/reportController');
const { protect } = require('../middleware/authmiddleware');

// Create new report
router.post('/', protect, createReport);

// Get all reports (admin can view all)
router.get('/', protect, getReports);

module.exports = router;
