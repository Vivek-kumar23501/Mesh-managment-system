const mongoose = require('mongoose');

const MessReductionFormSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  roll: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  file: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('MessReductionForm', MessReductionFormSchema);
