const express = require('express');
const authController = require('../controllers/authController');
const { verifyFirebaseToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/login-sync', verifyFirebaseToken, authController.loginSync);

module.exports = router;