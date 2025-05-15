const MatchService = require('../services/match.service');

  async function createMatch(req, res, next) {
    try {
      const { name, date } = req.body;

      const game = await MatchService.createMatch(name, date);

      return res.status(201).json({ success: true, game });

    } catch (error) {

      next(error);
    }
  }

  async function getAllMatches(req, res, next) {
    try {

      const games = await MatchService.getAllMatches();

      return res.status(200).json({ success: true, games });

    } catch (error) {

      next(error);

    }
  }

  async function getMatchById(req, res, next) {
    try {

      const game = await MatchService.getMatchById(req.params.id);

      return res.status(200).json({ success: true, game });

    } catch (error) {

      next(error);

    }
  }

  async function updateMatch(req, res, next) {
    try {
      
      const game = await MatchService.updateMatch(req.params.id, req.body);
      
      return res.status(200).json({ success: true, game });

    } catch (error) {

      next(error);

    }
  }

  async function deleteMatch(req, res, next) {
    try {

      await MatchService.deleteMatch(req.params.id);

      return res.status(200).json({ success: true, message: 'Match deleted successfully' });

    } catch (error) {

      next(error);

    }
  }


module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
};

