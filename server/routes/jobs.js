const express = require('express');
const router = express.Router();
const { postJob, getAllJobs, applyToJob ,updateUserRole , getPosterJobs} = require('../controllers/jobController');
const verifyToken = require('../middleware/verifyToken');
const { checkRole } = require('../middleware/roleMiddleware');


router.post('/post', verifyToken, postJob);        // Protect this route
router.get('/', getAllJobs);                       // Public route
router.post('/apply/:jobId', verifyToken, applyToJob); // Protect this too

router.get('/poster-dashboard', verifyToken, checkRole('poster'),getPosterJobs);

router.put('/select-role', verifyToken, updateUserRole);

module.exports = router;
