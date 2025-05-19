const MatchService = require('../services/match.service');
const participantsService = require('../services/participant.service');
const boardGameService = require('../services/boardgame.service')

  async function createMatch(req, res, next) {
    try {
      
      const { name, date, boardgameId } = req.body;

      /** Creamos la partida */
      const game = await MatchService.createMatch(name, date, boardgameId);

      /** Añadimos como participante al jugador que la ha creado. */
      const creatorPArticipant = await participantsService.createParticipant({ UserIdUser: req.user.userId, score: 0, MatchIdMatch: game.id_match })

      return res.status(201).json({ success: true, data: game });

    } catch (error) {

      next(error);
    }
  }

  async function getAllMatches(req, res, next) {
    try {

      const games = await MatchService.getAllMatches();
      const boardgames = await boardGameService.getAllBoardgames(['id_boardGame','name']);

      games.forEach(element => {
          const boardGameName = boardgames.filter(boardgame => boardgame.id_boardGame === element.BoardgameIdBoardGame);

          if (boardGameName.length > 0){
            element.dataValues.boardGameName = boardGameName[0].name
          }

      });

      return res.status(200).json({ success: true, data: games });

    } catch (error) {

      next(error);

    }
  }

  async function getMatchById(req, res, next) {
    try {

      const game = await MatchService.getMatchById(req.params.id);

      return res.status(200).json({ success: true, data: game });

    } catch (error) {

      next(error);

    }
  }

  async function updateMatch(req, res, next) {
    try {
      
      const game = await MatchService.updateMatch(req.params.id, req.body);
      
      return res.status(200).json({ success: true, data: game });

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

