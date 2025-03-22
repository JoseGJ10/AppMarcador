const GameService = require('../services/game.service');

  async function createGame(req, res, next) {
    try {
      const { name, date } = req.body;

      const game = await GameService.createGame(name, date);

      return res.status(201).json({ success: true, game });

    } catch (error) {

      next(error);
    }
  }

  async function getAllGames(req, res, next) {
    try {

      const games = await GameService.getAllGames();

      return res.status(200).json({ success: true, games });

    } catch (error) {

      next(error);

    }
  }

  async function getGameById(req, res, next) {
    try {

      const game = await GameService.getGameById(req.params.id);

      return res.status(200).json({ success: true, game });

    } catch (error) {

      next(error);

    }
  }

  async function updateGame(req, res, next) {
    try {
      
      const game = await GameService.updateGame(req.params.id, req.body);
      
      return res.status(200).json({ success: true, game });

    } catch (error) {

      next(error);

    }
  }

  async function deleteGame(req, res, next) {
    try {

      await GameService.deleteGame(req.params.id);

      return res.status(200).json({ success: true, message: 'Game deleted successfully' });

    } catch (error) {

      next(error);

    }
  }


module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};

