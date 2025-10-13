const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// REGISTER
exports.registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Allow admin creation only if environment variable allows it
    const isAdminValue =
      isAdmin && process.env.ALLOW_ADMIN_CREATION === 'true' ? true : false;

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdminValue,
    });

    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser);

    // Send response
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Registration failed', error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.authType === 'google') {
      return res
        .status(400)
        .json({ message: 'Use Google login for this account' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    // Send login notification email
    await sendEmail(
      user.email,
      'Login Notification - Job Finder',
      `Hello ${user.name},\n\nYou have successfully logged in at ${new Date().toLocaleString()}.\n\nIf this wasn’t you, please secure your account immediately.`
    );

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
