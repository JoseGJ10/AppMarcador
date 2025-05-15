const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const { authenticate, authorization } = require('../middlewares/authmiddleware');

// Rutas para Game

// Crear un juego (solo usuarios autenticados pueden crear juegos)
router.post('/', authenticate, matchController.createMatch);

// Obtener todos los juegos
router.get('/', authenticate, matchController.getAllMatches);

// Obtener un juego por ID
router.get('/:id', authenticate, matchController.getMatchById);

// Actualizar un juego por ID (solo usuarios autenticados pueden actualizar juegos)
router.put('/:id', authenticate, matchController.updateMatch);

// Eliminar un juego por ID (solo usuarios autenticados pueden eliminar juegos)
router.delete('/:id', authenticate, matchController.deleteMatch);

module.exports = router;
