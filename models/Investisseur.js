const mongoose = require('mongoose');

const investisseurSchema = userSchema.extend({
  investment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investissement',
  }]
});

const Investisseur = mongoose.model('Investisseur', investisseurSchema);
module.exports = Investisseur;