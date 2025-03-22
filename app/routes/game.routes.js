const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const { authenticate, authorization } = require('../middlewares/authmiddleware');

// Rutas para Game

// Crear un juego (solo usuarios autenticados pueden crear juegos)
router.post('/', authenticate, gameController.createGame);

// Obtener todos los juegos
router.get('/', authenticate, gameController.getAllGames);

// Obtener un juego por ID
router.get('/:id', authenticate, gameController.getGameById);

// Actualizar un juego por ID (solo usuarios autenticados pueden actualizar juegos)
router.put('/:id', authenticate, gameController.updateGame);

// Eliminar un juego por ID (solo usuarios autenticados pueden eliminar juegos)
router.delete('/:id', authenticate, gameController.deleteGame);

module.exports = router;
