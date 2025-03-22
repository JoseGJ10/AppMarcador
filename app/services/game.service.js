const { Game } = require('../models');

  async function createGame(name, date) {
    try {
      const game = await Game.create({ name, date });

      return game;

    } catch (error) {

      throw new Error('Error creating game: ' + error.message);

    }
  }

  async function getAllGames() {
    try {

      const games = await Game.findAll();

      return games;

    } catch (error) {
      
      throw new Error('Error fetching games: ' + error.message);

    }
  }

  async function getGameById(id) {
    try {
      const game = await Game.findByPk(id);

      if (!game) {
        throw new Error('Game not found');
      }

      return game;

    } catch (error) {
      throw new Error('Error fetching game: ' + error.message);
    }
  }

  async function updateGame(id, updates) {
    try {
      
      const game = await Game.findByPk(id);

      if (!game) {
        throw new Error('Game not found');
      }

      const updatedGame = await game.update(updates);

      return updatedGame;

    } catch (error) {

      throw new Error('Error updating game: ' + error.message);

    }
  }

  async function deleteGame(id) {
    try {

      const game = await Game.findByPk(id);

      if (!game) {
        throw new Error('Game not found');
      }

      const deletedGame = await game.destroy();

      return deletedGame;
    } catch (error) {
      throw new Error('Error deleting game: ' + error.message);
    }
  }

  module.exports = {
    createGame,
    getAllGames,
    getGameById,
    updateGame,
    deleteGame,
  };
