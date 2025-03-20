const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/users', userController.getUsers);

router.get('/userByid', userController.getUserByID);

router.get('/userByname', userController.getUserByName);

router.post('/users', userController.createUser);

module.exports = router