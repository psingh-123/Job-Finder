const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../controllers/authController');
const sendEmail = require('../utils/sendEmail'); // 👈 import your email util

// Register
router.post('/register', registerUser);

// Normal Login
router.post('/login', async (req, res) => {
  try {
    // call your existing loginUser controller
    const result = await loginUser(req, res);

    // loginUser should return user info (make sure it does)
    if (result && result.user) {
      await sendEmail(
        result.user.email,
        'Login Alert',
        `Hello ${result.user.name || 'User'}, you successfully logged in at ${new Date().toLocaleString()}.`
      );
    }
  } catch (err) {
    console.error('❌ Failed to send login email:', err);
  }
});

// Google Auth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google Callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false, // using JWT
  }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // 👇 Send login email
      await sendEmail(
        req.user.email,
        'Login Alert',
        `Hello ${req.user.name || 'User'}, you successfully logged in with Google at ${new Date().toLocaleString()}.`
      );

  // Redirect with JWT to frontend URL from env
  const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:3000';
  // Redirect with JWT
  res.redirect(`${FRONTEND}/google-success?token=${token}`);
    } catch (err) {
      console.error('❌ Failed to send login email:', err);
      res.redirect('/login');
    }
  }
);

module.exports = router;

