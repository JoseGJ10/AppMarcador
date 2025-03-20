const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/users', userController.getUsers);

router.get('/userByid', userController.getUserById);

router.get('/userByname', userController.getUserByUsername);

router.post('/users', userController.createUser);

module.exports = router