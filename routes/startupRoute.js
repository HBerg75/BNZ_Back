const express = require('express');
const router = express.Router();
const startupController = require('../controller/startupController');

// Créer une nouvelle startup
router.post('/startups', startupController.createStartup);

// Mettre à jour une startup par ID
router.put('/startups/:id', startupController.updateStartup);

// Récupérer toutes les startups
router.get('/startups', startupController.getAllStartups);

// Récupérer une startup par ID
router.get('/startups/:id', startupController.getStartupById);

// Supprimer une startup par ID
router.delete('/startups/:id', startupController.deleteStartup);

module.exports = router;