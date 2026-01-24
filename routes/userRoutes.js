const express = require('express');
const userController = require('../controllers/userController');
const { verifyFirebaseToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/tutors', userController.getFeaturedTutors);
router.get('/tutors/:id', userController.getTutorProfile);

router.patch('/update-me', verifyFirebaseToken, userController.updateMe);

module.exports = router;