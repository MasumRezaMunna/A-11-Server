const express = require('express');
const hireController = require('../controllers/hireController');
const { verifyFirebaseToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/request', verifyFirebaseToken, hireController.sendRequest);

module.exports = router;