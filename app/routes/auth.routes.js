const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');  // Importar el controlador de autenticación

// Ruta de login
router.post('/login', authController.login);

module.exports = router;