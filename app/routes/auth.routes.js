const express = require('express');
const router = express.Router();
const authController = require('../middlewares/authmiddleware.js');  // Importar el controlador de autenticación

// Ruta de login
router.post('/login', authController.login);

module.exports = router;