const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  startup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Startup',
    required: true
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
    required: true
  },
  investedAmount: {
    type: Number,
    required: true
  },
  investmentDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
