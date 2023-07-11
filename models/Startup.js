const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const startupSchema = new Schema({
    name: { type: String, required: true },
    kbis: { type: String, required: true },
    siret: { type: String, required: true },
    name: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    fundraisingGoal: { type: Number, required: true },
    amountRaised: { type: Number, required: true, default: 0 },
    entrepreneur: { type: Schema.Types.ObjectId, ref: 'Entrepreneur' },
    investors: [{ type: Schema.Types.ObjectId, ref: 'Investor' }],
    status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
    logo: { type: String, default: 'https://via.placeholder.com/150' },
    website: { type: String, default: 'https://via.placeholder.com/150' },
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;
