const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.findOneAndUpdate(
      { email: "Emails.com" }, // change this to the email you want to promote
      { $set: { isAdmin: true } },
      { new: true }
    );
    console.log("✅ Updated:", user);
    process.exit();
  })
  .catch(err => console.error(err));
