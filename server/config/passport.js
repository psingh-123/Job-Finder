const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ email: profile.emails[0].value });

        if (!existingUser) {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            authType: 'google',
            role: 'seeker', // or ask on frontend later
          });
          existingUser = await newUser.save();
        }

        return done(null, existingUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// session support (optional if you're using sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});