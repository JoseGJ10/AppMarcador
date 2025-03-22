const express = require('express');
const router = express.Router();
const gamePlayerController = require('../controllers/gamePlayer.controller');
const { authenticate, authorization } = require('../middlewares/authmiddleware');

// Rutas para GamePlayer

// Crear un GamePlayer
router.post('/', authenticate, gamePlayerController.createGamePlayer);

// Obtener los GamePlayers de un juego
router.get('/game/:gameId', authenticate, gamePlayerController.getGamePlayersByGameId);

// Obtener un GamePlayer por ID
router.get('/:id', authenticate, gamePlayerController.getGamePlayerById);

// Actualizar un GamePlayer por ID
router.put('/:id', authenticate, gamePlayerController.updateGamePlayer);

// Eliminar un GamePlayer por ID
router.delete('/:id', authenticate, gamePlayerController.deleteGamePlayer);

module.exports = router;
