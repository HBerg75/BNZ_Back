const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entrepreneur',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalSupply: {
        type: Number,
        required: true
    },
    remainingSupply: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true,
        default: 0
    },
    startup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Startup',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Nft = mongoose.model('Nft', nftSchema);

module.exports = Nft;
