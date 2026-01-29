const express = require("express");
const router = express.Router();
const hireController = require("../controllers/hireController");
const { verifyFirebaseToken } = require("../middlewares/authMiddleware");


router.get('/my-requests', verifyFirebaseToken, hireController.getMyRequests);

router.post('/request', verifyFirebaseToken, hireController.sendRequest);

module.exports = router;