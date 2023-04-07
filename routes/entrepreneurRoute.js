const express = require('express');
const router = express.Router();
const Entrepreneur = require('../models/entrepreneur');

// Get all entrepreneurs
router.get('/', async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    res.json(entrepreneurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one entrepreneur
router.get('/:id', getEntrepreneur, (req, res) => {
  res.json(res.entrepreneur);
});

// Create an entrepreneur
router.post('/', async (req, res) => {
  const entrepreneur = new Entrepreneur({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    role: 'entrepreneur',
    status: 'pending',
    postalCode: req.body.postalCode,
    city: req.body.city,
    country: req.body.country,
  });
  try {
    const newEntrepreneur = await entrepreneur.save();
    res.status(201).json(newEntrepreneur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an entrepreneur
router.patch('/:id', getEntrepreneur, async (req, res) => {
  if (req.body.firstName != null) {
    res.entrepreneur.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.entrepreneur.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.entrepreneur.email = req.body.email;
  }
  if (req.body.password != null) {
    res.entrepreneur.password = req.body.password;
  }
  if (req.body.address != null) {
    res.entrepreneur.address = req.body.address;
  }
  if (req.body.phoneNumber != null) {
    res.entrepreneur.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.postalCode != null) {
    res.entrepreneur.postalCode = req.body.postalCode;
  }
  if (req.body.city != null) {
    res.entrepreneur.city = req.body.city;
  }
  if (req.body.country != null) {
    res.entrepreneur.country = req.body.country;
  }
  try {
    const updatedEntrepreneur = await res.entrepreneur.save();
    res.json(updatedEntrepreneur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an entrepreneur
router.delete('/:id', getEntrepreneur, async (req, res) => {
  try {
    await res.entrepreneur.remove();
    res.json({ message: 'Entrepreneur deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get entrepreneur by id
async function getEntrepreneur(req, res, next) {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (entrepreneur == null) {
      return res.status(404).json({ message: 'Cannot find entrepreneur' });
    }
    res.entrepreneur = entrepreneur;
    next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
        }
    }
