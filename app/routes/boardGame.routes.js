const express = require('express');
const router = express.Router();
const BoardgameController = require('../controllers/boardGame.controller');
const { authenticate, authorization } = require('../middlewares/authmiddleware');
const { uploadSingle } = require('../middlewares/uploadMiddleware.js')

router.get('/', BoardgameController.getPaginatedBoardgames);

router.get('/:id', BoardgameController.getBoardgameById);

router.post('/', authenticate, authorization('admin'),uploadSingle('mainImage'), BoardgameController.createBoardgame);

router.put('/:id', authenticate, authorization('admin'),uploadSingle('mainImage'), BoardgameController.updateBoardgame);

router.delete('/:id', authenticate,authorization('admin') , BoardgameController.deleteBoardgame);

module.exports = router;
