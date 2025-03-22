const express = require('express');
const router = express.Router();
const BoardgameController = require('../controllers/boardGame.controller.js');
const { authenticate, authorization } = require('../middlewares/authmiddleware');

router.get('/', BoardgameController.getAllBoardgames);

router.get('/:id', authenticate, BoardgameController.getBoardgameById);

router.post('/', authenticate, authorization('admin'), BoardgameController.createBoardgame);

router.put('/:id', authenticate, authorization('admin'), BoardgameController.updateBoardgame);

router.delete('/:id', authenticate, authorization('admin'), BoardgameController.deleteBoardgame);

module.exports = router;
