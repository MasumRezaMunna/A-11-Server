const User = require('../models/User');

exports.getFeaturedTutors = async (req, res) => {
  try {
    const filter = req.query.role ? { role: req.query.role } : { role: 'tutor' };
    const users = await User.find(filter);

    res.status(200).json({
      status: 'success',
      data: { users }
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
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

exports.updateMe = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email }, 
      { profileImage: req.body.profileImage },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { user: updatedUser }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const filter = req.query.role ? { role: req.query.role } : {};
    
    const users = await User.find(filter);

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users }
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No tutor found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};