const Startup = require('../models/Startup');

exports.createStartup = async (req, res) => {
    try {
        const { name, description, , website, address, postalCode, city, country, sector, status, entrepreneurID } = req.body;
        const startup = await Startup.create({ name, description, logo, website, address, postalCode, city, country, sector, status, entrepreneurID });
        res.json({ message: 'Startup créée avec succès.', startup: startup });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    }