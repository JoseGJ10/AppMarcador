const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const participantController = require('../controllers/participant.controller')
const { authenticate, authorization } = require('../middlewares/authmiddleware');

// Rutas para Game

// Crear un juego (solo usuarios autenticados pueden crear juegos)
router.post('/', authenticate,authorization('admin','moderator','gameLibrarian','user'), matchController.createMatch);

// Añadimos Participante a la partida
router.post('/participant/add', authenticate, participantController.createParticipant);

// Obtener todos los juegos
router.get('/', authenticate, matchController.getAllMatches);

router.get('/open', matchController.getOpenMatches);

// Obtener una partida por ID
router.get('/:id', authenticate, matchController.getMatchById);

// Actualizar una partida por ID (solo usuarios autenticados pueden actualizar juegos)
router.put('/:id', authenticate, matchController.updateMatch);

// Cerramos la partida
router.patch('/:id/close',authenticate, matchController.closeMatch)

// Eliminar un juego por ID (solo usuarios autenticados pueden eliminar juegos)
router.delete('/:id', authenticate, matchController.deleteMatch);



module.exports = router;
