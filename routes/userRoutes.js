const express = require('express');
const userController = require('../controllers/userController');
const { verifyFirebaseToken } = require('../middlewares/authMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', userController.getFeaturedTutors); 

router.get('/notifications/count', authMiddleware.protect, userController.getNotificationCount);

router.patch('/update-me', verifyFirebaseToken, userController.updateMe);

router.get('/:id', userController.getTutorProfile);


router.get('/admin/all-users', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'), 
  userController.getAllUsers
);

router.patch('/admin/update-role/:id', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'), 
  userController.updateUserRole
);

router.delete('/admin/delete-user/:id', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'), 
  userController.deleteUser
);

module.exports = router;