const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const verifyToken = require('../middlewares/verifyToken');
const passport = require('passport');

router.put('/updateUser', passport.authenticate('jwt', { session: false}), userController.updateUser);
router.get('/allUsers',passport.authenticate('jwt', { session: false}), userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.delete('/deleteUser/:id', userController.deleteUser);


module.exports = router;
