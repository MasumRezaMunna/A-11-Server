const express = require("express");
const userController = require("../controllers/userController");
const { verifyFirebaseToken, protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", userController.getFeaturedTutors);

router.get("/:id", userController.getTutorProfile);
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    data: { user: req.user },
  });
});

router.patch("/update-me", verifyFirebaseToken, userController.updateMe);

module.exports = router;
