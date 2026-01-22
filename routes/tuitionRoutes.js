const express = require('express');
const tuitionController = require('../controllers/tuitionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', tuitionController.getAllTuitions);

router.post('/', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('student'), 
  tuitionController.createTuition
);

module.exports = router;