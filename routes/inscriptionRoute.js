const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Route pour l'inscription d'un nouvel utilisateur
router.post('/signup', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, address, phoneNumber, role, postalCode, city, country } = req.body;
    const user = await User.create({ firstName, lastName, email, password, address, phoneNumber, role, postalCode, city, country });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Inscription réussie!' });
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
