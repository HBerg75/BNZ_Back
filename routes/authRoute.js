const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const passport = require('passport');
require('../config/passport')(passport);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/session',  passport.authenticate('jwt', { session: false}),authController.getSessionData);

module.exports = router;
