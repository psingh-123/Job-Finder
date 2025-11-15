// routes/admin.js
const express = require('express');
const User = require('../models/User');
const Job = require('../models/Job'); 
const { protect } = require('../middleware/authmiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');
const Report = require('../models/Report');


const router = express.Router();

// ✅ Admin: Get all users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Admin: Promote a user to admin
router.put('/make-admin/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isAdmin = true;
    await user.save();

    res.json({ message: `${user.email} is now an admin` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Attempting to delete user ID:", userId);

    // Validate ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid ObjectId:", userId);
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Deleted user successfully:", userId);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get("/analytics", async (req, res) => {
  try {
    // Get total counts
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();

    // Monthly users (group by month)
    const userStats = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // Monthly jobs (group by month)
    const jobStats = await Job.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // Convert month numbers to readable names
    const monthNames = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedUserStats = userStats.map((u) => ({
      month: monthNames[u._id],
      count: u.count,
    }));

    const formattedJobStats = jobStats.map((j) => ({
      month: monthNames[j._id],
      count: j.count,
    }));

    res.json({
      totalUsers,
      totalJobs,
      userStats: formattedUserStats,
      jobStats: formattedJobStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/reports',protect, adminOnly, async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }); // sort by latest first
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
