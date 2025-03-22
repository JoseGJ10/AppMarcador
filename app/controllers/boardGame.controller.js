const BoardgameService = require('../services/boardgame.service');

const BoardgameController = {
  async getAllBoardgames(req, res) {
    try {
      const boardgames = await BoardgameService.getAllBoardgames();
      res.status(200).json(boardgames);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getBoardgameById(req, res) {
    const { id } = req.params;
    try {
      const boardgame = await BoardgameService.getBoardgameById(id);
      if (boardgame) {
        res.status(200).json(boardgame);
      } else {
        res.status(404).json({ message: `Boardgame with ID ${id} not found.` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createBoardgame(req, res) {
    const boardgameData = req.body;
    try {
      const newBoardgame = await BoardgameService.createBoardgame(boardgameData);
      res.status(201).json(newBoardgame);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateBoardgame(req, res) {
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
      res.status(500).json({ error: error.message });
    }
  },

  async deleteBoardgame(req, res) {
    const { id } = req.params;
    try {
      const deleted = await BoardgameService.deleteBoardgame(id);
      if (deleted) {
        res.status(204).send(); // Sin contenido, eliminación exitosa
      } else {
        res.status(404).json({ message: `Boardgame with ID ${id} not found.` });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = BoardgameController;