const { Match, Participant } = require('../models');

  async function createMatch(name, date, BoardgameIdBoardGame ) {
    try {
      const match = await Match.create({ name, date, BoardgameIdBoardGame   });

      return match;

    } catch (error) {

      throw new Error('Error creating match: ' + error.message);

    }
  }

  async function getAllMatches() {
    try {

      const matches = await Match.findAll({ include: {model: Participant} });

      return matches;

    } catch (error) {
      
      throw new Error('Error fetching matchs: ' + error.message);

    }
  }

  async function getMatchById(id) {
    try {
      const match = await Match.findByPk(id, { include: {model: Participant} });

      if (!match) {
        throw new Error('Match not found');
      }

      return match;

    } catch (error) {
      throw new Error('Error fetching match: ' + error.message);
    }
  }

  async function updateMatch(id, updates) {
    try {
      
      const match = await Match.findByPk(id);

      if (!match) {
        throw new Error('Match not found');
      }

      const updatedMatch = await match.update(updates);

      return updatedMatch;

    } catch (error) {

      throw new Error('Error updating match: ' + error.message);

    }
  }

  async function deleteMatch(id) {
    try {

      const match = await Match.findByPk(id);

      if (!match) {
        throw new Error('Match not found');
      }

      const deletedMatch = await match.destroy();

      return deletedMatch;
    } catch (error) {
      throw new Error('Error deleting match: ' + error.message);
    }
  }

  module.exports = {
    createMatch,
    getAllMatches,
    getMatchById,
    updateMatch,
    deleteMatch,
  };
