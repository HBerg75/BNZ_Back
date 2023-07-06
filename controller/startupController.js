const Startup = require("../models/startup");

// Route pour créer une nouvelle startup
exports.createStartup = async (req, res) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();
    res.status(201).send(startup);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Route pour obtenir les détails d'une startup par ID
exports.getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).send();
    }
    res.send(startup);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Route pour lister toutes les startups
exports.getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find();
    res.send(startups);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Route pour modifier une startup
exports.updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!startup) {
      return res.status(404).send();
    }
    res.send(startup);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Route pour supprimer une startup
exports.deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findByIdAndDelete(req.params.id);
    if (!startup) {
      return res.status(404).send();
    }
    res.send(startup);
  } catch (error) {
    res.status(500).send(error);
  }
};