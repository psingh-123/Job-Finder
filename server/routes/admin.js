// routes/admin.js
const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

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

module.exports = router;
