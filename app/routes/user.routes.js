const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorization } = require('../middlewares/authmiddleware');
const { uploadSingle } = require('../middlewares/uploadMiddleware.js')

router.get('/', authenticate, authorization('admin'), userController.getPaginatedUsers);

router.get('/:id([0-9]+)', authenticate, authorization('admin'), userController.getUserById);

router.get('/:username', authenticate, authorization('admin', 'user'), userController.getUserByUsername);

router.post('/', authenticate, authorization('admin'), uploadSingle('avater'), userController.createUser);

router.put('/:id',authenticate, authorization('admin','user'),uploadSingle('avatar'), userController.updateUser);

router.delete('/', authenticate, authorization('admin'), userController.deleteUser);

module.exports = router;
