const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser } = require('../controllers/authController');


router.post('/register', registerUser);


router.post('/login', loginUser);

// 👇 This route is missing in your current file
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);


router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false, // we are using JWT
  }),
  (req, res) => {
    // generate JWT and send it as response
    const jwt = require('jsonwebtoken');

    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect or send token as JSON
    res.redirect(`http://localhost:3000/google-success?token=${token}`);
  }
);


module.exports = router;
