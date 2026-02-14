const express = require("express");
const router = express.Router();
const tuitionController = require("../controllers/tuitionController");
const { verifyFirebaseToken, protect, restrictTo } = require("../middlewares/authMiddleware");

router.get("/all-open", async (req, res) => {
  try {
    const Tuition = require("../models/Tuition");
    const tuitions = await Tuition.find({ status: "open" }).sort("-createdAt");
    res.status(200).json({ status: "success", data: tuitions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get(
  "/my-applications",
  verifyFirebaseToken, 
  tuitionController.getMyApplications
);

router.get(
  "/my-sent-applications",
  protect,
  restrictTo("tutor"),
  tuitionController.getTutorDashboard
);

router.post(
  "/",
  protect,
  restrictTo("student"),
  tuitionController.createTuition
);

router.post(
  "/:id/apply",
  protect,
  restrictTo("tutor"),
  tuitionController.applyToTuition
);

router.patch(
  "/:id/status",
  protect,
  restrictTo("admin"),
  tuitionController.updateTuitionStatus
);

router.patch(
  "/applications/:appId/status",
  protect,
  restrictTo("student"),
  tuitionController.updateApplicationStatus
);













router.get("/", tuitionController.getAllTuitions);



router.get("/:id", tuitionController.getTuition);

module.exports = router;