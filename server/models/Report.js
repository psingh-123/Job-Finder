const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reportedEmail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
