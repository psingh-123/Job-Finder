const Job = require('../models/Job');
const User = require('../models/User');
const Notification = require('../models/Notification');

// POST a new job
exports.postJob = async (req, res) => {
  try {
    const newJob = new Job({
      ...req.body,
      postedBy: req.user.id,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// APPLY to a job
exports.applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const userId = req.user.id;

    const alreadyApplied = job.applicants.some(
      applicantId => applicantId.toString() === userId
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied' });
    }

    job.applicants.push(userId);
    await job.save();

    // Send notification to job poster
    const applicant = await User.findById(userId);
    await Notification.create({
      user: job.postedBy, // recipient is the job poster
      message: `${applicant.name} applied for your job: "${job.title}"`,
    });

    res.status(200).json({ message: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET jobs posted by the current poster (with applicants)
exports.getPosterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).populate('applicants', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET all open jobs (public)
exports.getAllOpenJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE user role and location
exports.updateUserRole = async (req, res) => {
  const { role, location } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { role, location },
      { new: true }
    );

    res.status(200).json({
      message: 'Role updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role', error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // 🔍 Job not found
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 🔍 Check if postedBy field exists (optional but useful)
    if (!job.postedBy) {
      return res.status(400).json({ message: 'Job has no postedBy info' });
    }

    // 🔒 Ensure the user deleting is the owner of the job
    if (!job.postedBy.toString || job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await job.deleteOne(); // or await job.remove() for older Mongoose versions
    res.status(200).json({ message: 'Job deleted successfully' });

  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error while deleting job' });
  }
};
