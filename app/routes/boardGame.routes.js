// routes/boardgame.routes.js
const express = require('express');
const router = express.Router();
const BoardgameController = require('../controllers/boardGame.controller.js');
const { authenticate, authorization } = require('../middlewares/authmiddleware');

// Obtener todos los boardgames
router.get('/', BoardgameController.getAllBoardgames);

// Obtener un boardgame por ID
router.get('/:id', BoardgameController.getBoardgameById);

// Crear un nuevo boardgame
router.post('/', BoardgameController.createBoardgame);

// Actualizar un boardgame por ID
router.put('/:id', BoardgameController.updateBoardgame);

// Eliminar un boardgame por ID
router.delete('/:id', BoardgameController.deleteBoardgame);

module.exports = router;