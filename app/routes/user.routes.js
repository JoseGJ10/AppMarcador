const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorization } = require('../middlewares/authmiddleware');

router.get('/', authenticate, authorization('admin'), userController.getUsers);

router.get('/:id([0-9]+)', authenticate, authorization('admin'), userController.getUserById);

router.get('/:username', authenticate, authorization('admin', 'user'), userController.getUserByUsername);

router.post('/', authenticate, authorization('admin'), userController.createUser);

router.delete('/', authenticate, authorization('admin'), userController.deleteUser);

module.exports = router;
