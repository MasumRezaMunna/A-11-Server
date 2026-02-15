const mongoose = require('mongoose');

const tuitionSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'A tuition must belong to a student'] 
  },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  location: { type: String, required: true }, 
  salary: { type: Number, required: true },
  daysPerWeek: { type: Number, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Tuition', tuitionSchema);