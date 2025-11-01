const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const notificationRoutes = require('./routes/notifications');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

dotenv.config();
require('./config/passport'); // Google strategy config

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// Session for Google login
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);  
app.use('/api/jobs', jobRoutes); 
app.use('/api/notifications', notificationRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
