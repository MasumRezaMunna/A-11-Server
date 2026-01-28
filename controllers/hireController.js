const HireRequest = require('../models/HireRequest');
const User = require('../models/User');

exports.sendRequest = async (req, res) => {
  try {
    const studentEmail = req.user.email;
    const student = await User.findOne({ email: studentEmail });

    if (!student) {
      return res.status(404).json({ message: "Student account not found in database" });
    }

    const { tutorId, message } = req.body;

    if (student._id.toString() === tutorId) {
      return res.status(400).json({ message: "You cannot hire yourself!" });
    }

    const newRequest = await HireRequest.create({
      student: student._id,
      tutor: tutorId,
      message
    });

    res.status(201).json({ status: 'success', data: newRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};