const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  tuition: { type: mongoose.Schema.Types.ObjectId, ref: 'Tuition', required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);