const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      default: '',
    },
    authType: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    role: {
      type: String,
      enum: ['poster', 'seeker'],
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    city: {
      type: String,
    required: true
  } 
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
