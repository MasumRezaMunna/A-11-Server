const express = require("express");
const router = express.Router();
const tuitionController = require("../controllers/tuitionController");
const authMiddleware = require("../middlewares/authMiddleware");
const Tuition = require("../models/Tuition");


router.get('/admin/all-tuitions', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'), 
  tuitionController.getAdminTuitions
);

router.get('/my-applications', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('student'), 
  tuitionController.getStudentDashboard
);

router.get('/my-sent-applications', 
  authMiddleware.protect, 
  authMiddleware.restrictTo('tutor'), 
  tuitionController.getTutorDashboard
);

router.get("/all", async (req, res) => {
  try {
    const tuitions = await Tuition.find({ status: "approved" }).sort("-createdAt");
    res.status(200).json({ status: "success", data: tuitions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", authMiddleware.protect, authMiddleware.restrictTo("student"), tuitionController.createTuition);

router.post('/:id/apply', authMiddleware.protect, authMiddleware.restrictTo('tutor'), tuitionController.applyToTuition);

router.patch('/applications/:appId/status', authMiddleware.protect, authMiddleware.restrictTo('student'), tuitionController.updateApplicationStatus);

router.patch('/:id/status', authMiddleware.protect, authMiddleware.restrictTo('admin'), tuitionController.updateTuitionStatus);


router.get("/", tuitionController.getAllTuitions); 

router.get("/:id", tuitionController.getTuition);

module.exports = router;