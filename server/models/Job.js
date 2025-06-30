const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

  title: String,
  description: String,
  category: String, // plumber, tutor, delivery, etc.
  location: String,
  phone: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },

});


module.exports = mongoose.model('Job', jobSchema);
 