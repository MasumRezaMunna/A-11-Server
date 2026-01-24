const mongoose = require('mongoose');

const hireRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('HireRequest', hireRequestSchema);