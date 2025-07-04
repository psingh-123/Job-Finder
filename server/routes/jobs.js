const express = require('express');
const router = express.Router();
const { postJob, getAllJobs, applyToJob ,updateUserRole , getPosterJobs,deletePost} = require('../controllers/jobController');
const verifyToken = require('../middleware/verifyToken');
const { checkRole } = require('../middleware/roleMiddleware');
const Notification = require('../models/Notification');


router.post('/post', verifyToken, postJob);        // Protect this route
router.get('/', getAllJobs);                       // Public route
router.post('/apply/:jobId', verifyToken, applyToJob); // Protect this too

router.get('/poster-dashboard', verifyToken, checkRole('poster'),getPosterJobs);

router.put('/select-role', verifyToken, updateUserRole);

router.delete('/:id',verifyToken,deletePost);

module.exports = router;
