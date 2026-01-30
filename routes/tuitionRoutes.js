const express = require('express');
const router = express.Router();
const tuitionController = require('../controllers/tuitionController');
const authMiddleware = require('../middlewares/authMiddleware');
// const verifyFirebaseToken = require('../middleware/auth');
const Tuition = require('../models/Tuition');

// router.post('/post', verifyFirebaseToken, async (req, res) => {
//   try {
//     const newTuition = new Tuition({
//       ...req.body,
//       student: req.user.mongoId
//     });
//     await newTuition.save();
//     res.status(201).json({ status: 'success', data: newTuition });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


router.get('/', tuitionController.getAllTuitions);

router.post('/', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('student'), 
  tuitionController.createTuition
);

module.exports = router;