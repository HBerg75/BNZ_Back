const Startup = require('../models/Startup');

exports.createStartup = async (req, res) => {
    try {
        const { entrepreneurID } = req.body;
        const startup = await Startup.create({ name, kbis, siret, description, fundraisingGoal, amountRaised, investors, entrepreneur, status, entrepreneurID });
        res.json({ message: 'Startup créée avec succès.', startup: startup });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    }