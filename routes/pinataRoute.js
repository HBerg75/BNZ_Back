const express = require('express');
const router = express.Router();
const pinataController = require('../controller/pinataController');

router.post('/upload', pinataController.uploadPinata);