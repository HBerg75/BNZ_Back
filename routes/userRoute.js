const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.put('/updateUser', userController.updateUser);
router.get('/allUsers', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.delete('/deleteUser/:id', userController.deleteUser);


module.exports = router;
