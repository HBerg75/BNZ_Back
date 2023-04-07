const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route pour la création d'un utilisateur
router.post('/createUser', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route pour la mise à jour d'un utilisateur
router.put('/modifyUser/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route pour la suppression d'un utilisateur
router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route pour la récupération d'un utilisateur
router.get('/singleUser/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route pour la récupération de tous les utilisateurs ?
router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
