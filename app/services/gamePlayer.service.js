const { GamePlayer } = require('../models');

  async function createGamePlayer(gamePlayerData) {

    try {

      const gamePlayer = await GamePlayer.create(gamePlayerData);

      return gamePlayer;

    } catch (error) {

      throw new Error('Error creating game player: ' + error.message);

    }
  }

  async function getGamePlayersByGameId(gameId) {
    try {

      const gamePlayers = await GamePlayer.findAll({ where: { gameId } });

      return gamePlayers;

    } catch (error) {

      throw new Error('Error fetching game players: ' + error.message);

    }
  }

  async function getGamePlayerById(id) {

    try {

      const gamePlayer = await GamePlayer.findByPk(id);

      if (!gamePlayer) {

        throw new Error('GamePlayer not found');

      }

      return gamePlayer;

    } catch (error) {

      throw new Error('Error fetching game player: ' + error.message);
   
    }
  }

  async function updateGamePlayer(id, jsonData, score, winner) {
    try {
      const gamePlayer = await GamePlayer.findByPk(id);
      if (!gamePlayer) {
        throw new Error('GamePlayer not found');
      }
      gamePlayer.jsonData = jsonData || gamePlayer.jsonData;
      gamePlayer.score = score || gamePlayer.score;
      gamePlayer.winner = winner || gamePlayer.winner;
      await gamePlayer.save();
      return gamePlayer;
    } catch (error) {
      throw new Error('Error updating game player: ' + error.message);
    }
  }

  async function deleteGamePlayer(id) {
    try {
      const gamePlayer = await GamePlayer.findByPk(id);
      if (!gamePlayer) {
        throw new Error('GamePlayer not found');
      }
      await gamePlayer.destroy();
      return true;
    } catch (error) {
      throw new Error('Error deleting game player: ' + error.message);
    }
  }

module.exports = {
  createGamePlayer,
  getGamePlayersByGameId,
  getGamePlayerById,
  updateGamePlayer,
  deleteGamePlayer,
};
