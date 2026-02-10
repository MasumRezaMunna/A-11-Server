const express = require("express");
const router = express.Router();
const tuitionController = require("../controllers/tuitionController");
// const paymentController = require('../controllers/paymentController');
const { verifyFirebaseToken, protect, restrictTo } = require("../middlewares/authMiddleware");


router.get(
  "/my-applications",
  verifyFirebaseToken, 
  tuitionController.getMyApplications
);

router.post(
  "/",
  protect,
  restrictTo("student"),
  tuitionController.createTuition
);

router.patch(
  "/applications/:appId/status",
  protect,
  restrictTo("student"),
  tuitionController.updateApplicationStatus
);



router.get(
  "/my-sent-applications",
  protect,
  restrictTo("tutor"),
  tuitionController.getTutorDashboard
);

router.post(
  "/:id/apply",
  protect,
  restrictTo("tutor"),
  tuitionController.applyToTuition
);



// router.post(
//   "/create-checkout-session",
//   verifyFirebaseToken,
//   paymentController.createCheckoutSession
// );



router.get("/", tuitionController.getAllTuitions);

router.get("/all-open", async (req, res) => {
  try {
    const Tuition = require("../models/Tuition");
    const tuitions = await Tuition.find({ status: "open" }).sort("-createdAt");
    res.status(200).json({ status: "success", data: tuitions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", tuitionController.getTuition);

module.exports = router;