// // const express = require('express');
// // const dotenv = require('dotenv');
// // const cors = require('cors');
// // const connectDB = require('./config/db');
// // const session = require('express-session');
// // const passport = require('passport');
// // const notificationRoutes = require('./routes/notifications');
// // const userRoutes = require('./routes/user');
// // const adminRoutes = require('./routes/admin');
// // const authRoutes = require('./routes/auth');
// // const jobRoutes = require('./routes/jobs');
// // const reportRoutes = require('./routes/report');

// // dotenv.config();
// // require('./config/passport'); // Google strategy config

// // const app = express();

// // // Connect MongoDB
// // connectDB();

// // // Middlewares
// // app.use(
// //   cors({
// //     // origin: process.env.FRONTEND_URL || 'http://localhost:3000',
// //     origin: ' https://unphenomenally-misadjudicated-jeremy.ngrok-free.dev',
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());

// // // Session for Google login
// // app.use(
// //   session({
// //     secret: process.env.SESSION_SECRET || 'keyboard cat',
// //     resave: false,
// //     saveUninitialized: false,
// //   })
// // );

// // app.use(passport.initialize());
// // app.use(passport.session());

// // // Routes
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/auth', authRoutes);  
// // app.use('/api/jobs', jobRoutes); 
// // app.use('/api/notifications', notificationRoutes);
// // app.use('/api/user', userRoutes);
// // app.use('/api/reports', reportRoutes);


// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
// // });

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const session = require('express-session');
// const passport = require('passport');
// const notificationRoutes = require('./routes/notifications');
// const userRoutes = require('./routes/user');
// const adminRoutes = require('./routes/admin');
// const authRoutes = require('./routes/auth');
// const jobRoutes = require('./routes/jobs');
// const reportRoutes = require('./routes/report');

// dotenv.config();
// require('./config/passport'); // Google strategy config

// const app = express();

// // --- 1. TRUST PROXY (Required for login cookies) ---
// app.set('trust proxy', 1);

// // Connect MongoDB
// connectDB();

// // --- 2. YOUR CORS FIX ---
// // 
// // PASTE YOUR NEW FRONTEND URL (from ngrok http 3000) HERE:
// //
// const newFrontendUrl = 'https://[PASTE-YOUR-NEW-FRONTEND-URL-HERE].ngrok-free.dev';


// const allowedOrigins = [
//   'http://localhost:3000', // For local testing
//   'https://unphenomenally-misadjudicated-jeremy.ngrok-free.dev'          // Your new random frontend
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('This origin is not allowed by CORS'));
//       }
//     },
//     credentials: true, // CRITICAL for sessions
//   })
// );

// app.use(express.json());

// // --- 3. SESSION COOKIE FIX (Required for login) ---
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: true,     // Requires HTTPS (ngrok provides this)
//       httpOnly: true,
//       sameSite: 'none', // CRITICAL for cross-domain cookies
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // --- 4. YOUR ROUTES ---
// app.use('/api/admin', adminRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/reports', reportRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });



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
const reportRoutes = require('./routes/report');

dotenv.config();
require('./config/passport');

const app = express();

// REQUIRED FOR COOKIE + NGROK
app.set('trust proxy', 1);

// Connect database
connectDB();

// ------------------ CORS FIX ------------------
const allowedOrigins = [
 "https://naukari-dhundo-frontend.onrender.com",
];
 
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);
// ------------------------------------------------


// Parse JSON
app.use(express.json());

// ------------------ SESSION FIX ------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,      // Required for HTTPS (ngrok)
      httpOnly: true,
      sameSite: "none",  // Required for cross-domain cookies
    },
  })
);
// --------------------------------------------------


app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
