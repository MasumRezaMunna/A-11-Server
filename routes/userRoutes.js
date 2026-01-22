const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/tutors', userController.getFeaturedTutors);
router.get('/tutors/:id', userController.getTutorProfile);

module.exports = router;