const mongoose = require('mongoose');
const User = require('./user');

const investisseurSchema = User.discriminator('Investisseur', new mongoose.Schema({
  investment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investissement',
    required: true
  },
}));


const Investisseur = mongoose.model('Investisseur', investisseurSchema);
module.exports = Investisseur;