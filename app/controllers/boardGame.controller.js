const BoardgameService = require('../services/boardgame.service');

  async function getAllBoardgames(req, res, next) {
    try {
      const boardgames = await BoardgameService.getAllBoardgames();
      res.status(200).json(boardgames);
    } catch (error) {
      next(error);
    }
  }

  async function getBoardgameById(req, res, next) {
    const { id } = req.params;
    try {
      const boardgame = await BoardgameService.getBoardgameById(id);
      if (boardgame) {
        res.status(200).json(boardgame);
      } else {
        res.status(404).json({ message: `Boardgame with ID ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  }

  async function createBoardgame(req, res, next) {
    const boardgameData = req.body;
    try {
      const newBoardgame = await BoardgameService.createBoardgame(boardgameData);
      res.status(201).json(newBoardgame);
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
        res.status(200).json(updatedBoardgame);
      } else {
        res.status(404).json({ message: `Boardgame with ID ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  }

  async function deleteBoardgame(req, res, next) {

    const { id } = req.params;

    try {

      const deleted = await BoardgameService.deleteBoardgame(id);

      res.status(204).send(deleted); // Sin contenido, eliminación exitosa

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