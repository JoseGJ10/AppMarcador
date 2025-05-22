const { Participant, User } = require('../models');

  async function createParticipant(participantData) {

    try {

      const participant = await Participant.create(participantData);

      return participant;

    } catch (error) {

      throw new Error('Error creating game player: ' + error.message);

    }
  }

  async function getParticipantsByMatchId(matchId) {
    try {

      const participants = await Participant.findAll({ where: { matchId }, include: { model: user}  });

      return participants;

    } catch (error) {

      throw new Error('Error fetching game players: ' + error.message);

    }
  }

  async function getParticipantById(id) {

    try {

      const participant = await Participant.findByPk(id, { include: { model: user}  });

      if (!participant) {

        throw new Error('Participant not found');

      }

      return participant;

    } catch (error) {

      throw new Error('Error fetching game player: ' + error.message);
   
    }
  }

  async function updateParticipant(id, jsonData, score, winner) {
    try {
      const participant = await Participant.findByPk(id);
      if (!participant) {
        throw new Error('Participant not found');
      }
      participant.jsonData = jsonData || participant.jsonData;
      participant.score = score || participant.score;
      participant.winner = winner || participant.winner;
      await participant.save();
      return participant;
    } catch (error) {
      throw new Error('Error updating game player: ' + error.message);
    }
  }

  async function deleteParticipant(id) {
    try {
      const participant = await Participant.findByPk(id);
      if (!participant) {
        throw new Error('Participant not found');
      }
      await participant.destroy();
      return true;
    } catch (error) {
      throw new Error('Error deleting game player: ' + error.message);
    }
  }

module.exports = {
  createParticipant,
  getParticipantsByMatchId,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
};
