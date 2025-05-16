const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participant.controller');
const { authenticate, authorization } = require('../middlewares/authmiddleware');

// Rutas para GamePlayer

// Crear un GamePlayer
router.post('/', authenticate,authorization(['admin','moderator','gameLibrarian','user']), participantController.createParticipant);

// Obtener los GamePlayers de un juego
router.get('/match/:matchId', authenticate, participantController.getParticipantsByMatchId);

// Obtener un GamePlayer por ID
router.get('/:id', authenticate, participantController.getParticipantById);

// Actualizar un GamePlayer por ID
router.put('/:id', authenticate, participantController.updateParticipant);

// Eliminar un GamePlayer por ID
router.delete('/:id', authenticate, participantController.deleteParticipant);

module.exports = router;
