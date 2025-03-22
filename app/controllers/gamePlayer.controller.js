
const GamePlayerService = require('../services/gamePlayer.service');

async function createGamePlayer(req, res, next) {
    try {
      
      const gamePlayer = await GamePlayerService.createGamePlayer(req.body);
      
      res.status(201).json({ success: true, gamePlayer });

    } catch (error) {

       next(error);

    }
}

async function getGamePlayersByGameId(req, res, next) {

    try {

        const gamePlayers = await GamePlayerService.getGamePlayersByGameId(req.params.gameId);

        res.status(200).json({ success: true, gamePlayers });

    } catch (error) {

         next(error);
    }
}

async function getGamePlayerById(req, res, next) {
    try {

        const gamePlayer = await GamePlayerService.getGamePlayerById(req.params.id);
        
        res.status(200).json({ success: true, gamePlayer });

    } catch (error) {

        next(error);
        
    }
}

async function updateGamePlayer(req, res, next) {
    try {
        const { jsonData, score, winner } = req.body;
        const gamePlayer = await GamePlayerService.updateGamePlayer(req.params.id, jsonData, score, winner);
        res.status(200).json({ success: true, gamePlayer });
    } catch (error) {
         next(error);
    }
}

async function deleteGamePlayer(req, res, next) {
try {
    await GamePlayerService.deleteGamePlayer(req.params.id);
    res.status(200).json({ success: true, message: 'GamePlayer deleted successfully' });
} catch (error) {
    next(error);
}
}


module.exports = {
    createGamePlayer,
    getGamePlayersByGameId,
    getGamePlayerById,
    updateGamePlayer,
    deleteGamePlayer,
}
