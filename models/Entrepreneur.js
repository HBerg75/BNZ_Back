const mongoose = require('mongoose');
const User = require('./user');

const entrepreneurSchema = User.discriminator('Entrepreneur', new mongoose.Schema({
  startupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Startup',
    required: true
  },
}));

module.exports = mongoose.model('Entrepreneur', entrepreneurSchema);
