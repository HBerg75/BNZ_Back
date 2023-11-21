const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const verifyToken = require('../middlewares/verifyToken');
const passport = require('passport');
require('../config/passport')(passport);


router.put('/updateUser/:id', passport.authenticate('jwt', { session: false}), userController.updateUser);
router.get('/allUsers',passport.authenticate('jwt', { session: false}), userController.getAllUsers);
router.get('/user/:id',passport.authenticate('jwt', {session: false}), userController.getUser);
router.delete('/deleteUser/:id',passport.authenticate('jwt', {session: false}), userController.deleteUser);


module.exports = router;
