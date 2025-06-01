const MatchService = require('../services/match.service');
const participantsService = require('../services/participant.service');
const boardGameService = require('../services/boardgame.service')

  async function createMatch(req, res, next) {
    try {
      
      const { name, date, boardgameId,time } = req.body;

      /** Creamos la partida */
      const game = await MatchService.createMatch(name, date, boardgameId, time);

      /** Añadimos como participante al jugador que la ha creado. */
      const creatorPArticipant = await participantsService.createParticipant({ UserIdUser: req.user.userId, score: 0, MatchIdMatch: game.id_match, creatorMatch: true })

      return res.status(201).json({ success: true, data: game });

    } catch (error) {

      next(error);
    }
  }

  async function getAllMatches(req, res, next) {
    try {

      const games = await MatchService.getAllMatches();
      const boardgames = await boardGameService.getAllBoardgames(['id_boardGame','name','min_players','max_players']);

      games.forEach(element => {
          const boardGameName = boardgames.filter(boardgame => boardgame.id_boardGame === element.BoardgameIdBoardGame);

          if (boardGameName.length > 0){
            element.dataValues.boardGameName = boardGameName[0].name
            element.dataValues.min_players = boardGameName[0].min_players
            element.dataValues.max_players = boardGameName[0].max_players
          }

      });

      return res.status(200).json({ success: true, data: games });

    } catch (error) {

      next(error);

    }
  }

  async function getOpenMatches(req, res, next){
    try {
      const matches = await MatchService.getOpenMatches();

      res.status(200).json({success: true, data: matches})
    } catch (error) {
       next(error)
    }
  }

  async function getMatchById(req, res, next) {
    try {

      const game = await MatchService.getMatchById(req.params.id);

      const boardgame = await boardGameService.getBoardgameById(game.BoardgameIdBoardGame)

      if (boardgame){
          game.dataValues.boardGameName = boardgame.name
          game.dataValues.min_players = boardgame.min_players
          game.dataValues.max_players = boardgame.max_players
      }

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

      const {id} = req.params
      const userId = req.user.userId

      const match = await MatchService.getMatchById(id);

      const creator = match.Participants.find(p => p.creatorMatch)

      if(!creator || creator.UserIdUser !== userId){
         return res.status(403).json({ message: "No tienes permisos para borrar esta partida" });
      }

      await MatchService.deleteMatch(id);

      return res.status(200).json({ success: true, message: 'Match deleted successfully' });

    } catch (error) {

      next(error);

    }
  }

  async function closeMatch(req,res,next){
    const {id} = req.params

    try {
        const match = await MatchService.getMatchById(id)

        if(!match){
          const error = new Error("Partida no encontrada en BBDD");
          error.statuscode = 404,
          error.name = 'Partida No Encontrada.'

          throw error;
        }

        match.closed = true
        await match.save();
    } catch {
        next(error);
    }
  }


module.exports = {
  createMatch,
  getAllMatches,
  getOpenMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  closeMatch
};

