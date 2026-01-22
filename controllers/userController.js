const User = require('../models/User');

exports.getFeaturedTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor' })
      .limit(4) 
      .select('name education profileImage subjects rating'); 

    res.status(200).json({
      status: 'success',
      results: tutors.length,
      data: { tutors }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getTutorProfile = async (req, res) => {
  try {
    const tutor = await User.findById(req.params.id).select('-password');
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.status(200).json({ status: 'success', data: { tutor } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};