const mongoose = require('mongoose');

const entrepreneurSchema = userSchema.extend({    
    startupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Startup',
        required: true
    },
});

const Entrepreneur = mongoose.model('Entrepreneur', entrepreneurSchema);

module.exports = Entrepreneur;
