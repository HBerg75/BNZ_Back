const mongoose = require('mongoose');

const startupWallSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  roadmap: {
    type: String
  },
  about: {
    type: String
  },
  contact: {
    type: String
  },
  datepost: {
    type: Date,
    default: Date.now
  },
  entrepreneurID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entrepreneur',
    required: true
  },
  startupID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Startup',
    required: true
  }
});

const StartupWall = mongoose.model('StartupWall', startupWallSchema);

module.exports = StartupWall;
