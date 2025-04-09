const BoardgameService = require('../services/boardgame.service');

  async function getAllBoardgames(req, res, next) {
    try {
      const boardgames = await BoardgameService.getAllBoardgames();
      res.status(200).json({success: true, data: boardgames});
    } catch (error) {
      next(error);
    }
  }

  async function getBoardgameById(req, res, next) {
    const { id } = req.params;
    try {
      const boardgame = await BoardgameService.getBoardgameById(id);
      if (boardgame) {
        res.status(200).json({success: true, data: boardgame});
      } else {
        res.status(404).json({ success: false, message: `Boardgame with ID ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  }

  async function createBoardgame(req, res, next) {
    const boardgameData = req.body;
    try {
      const newBoardgame = await BoardgameService.createBoardgame(boardgameData);
      res.status(201).json({success: true, data:newBoardgame});
    } catch (error) {
      next(error);
    }
  }

  async function updateBoardgame(req, res, next) {
    const { id } = req.params;
    const boardgameData = req.body;
    try {
      const updatedBoardgame = await BoardgameService.updateBoardgame(id, boardgameData);
      if (updatedBoardgame) {
        res.status(200).json({success: true, data:updatedBoardgame});
      } else {
        res.status(404).json({ success: false, message: `Boardgame with ID ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  }

  async function deleteBoardgame(req, res, next) {

    const { id } = req.params;

    try {

      const deleted = await BoardgameService.deleteBoardgame(id);

      res.status(204).send({success: true, data:deleted}); 

    } catch (error) {
      next(error);
    }
  }


module.exports = {
  getAllBoardgames,
  getBoardgameById,
  createBoardgame,
  updateBoardgame,
  deleteBoardgame,
};