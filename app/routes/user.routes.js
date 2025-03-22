const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);

router.get('/:id([0-9]+)', userController.getUserById);

router.get('/:username', userController.getUserByUsername);

router.post('/', userController.createUser);

router.delete('/', userController.deleteUser);

module.exports = router