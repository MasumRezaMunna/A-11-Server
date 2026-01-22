const mongoose = require('mongoose');

const tuitionSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  student: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  class: { type: String, required: true },
  subject: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  description: String,
  status: { type: String, enum: ['open', 'filled'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Tuition', tuitionSchema);