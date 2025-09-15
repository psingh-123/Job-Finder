// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//     },
//     profilePic: {
//       type: String,
//       default: '',
//     },
//     authType: {
//       type: String,
//       enum: ['local', 'google'],
//       default: 'local',
//     },
//     role: {
//       type: String,
//       enum: ['poster', 'seeker'],
//       default: null,
//     },
//     location: {
//       type: String,
//       default: null,
//     },
//     city: {
//       type: String,
//     required: false,
//     default:''
//   } 
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('User', userSchema);

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
      required: false,
      default: '',
    },
    // 👇 New field
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
