const HireRequest = require('../models/HireRequest');
const User = require('../models/User');

exports.sendRequest = async (req, res) => {
  try {
    const student = await User.findOne({ email: req.user.email });
    
    if (student._id.toString() === req.body.tutorId) {
      return res.status(400).json({ message: "You cannot hire yourself!" });
    }

    const newRequest = await HireRequest.create({
      student: student._id,
      tutor: req.body.tutorId,
      message: req.body.message
    });

    res.status(201).json({ status: 'success', data: newRequest });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};