const { Match, Participant, User, Boardgame } = require('../models');

  async function createMatch(name, date, BoardgameIdBoardGame, time ) {
    try {
      const match = await Match.create({ name, date, BoardgameIdBoardGame, time  });

      return match;

    } catch (error) {

      throw new Error('Error creating match: ' + error.message);

    }
  }

  async function getAllMatches() {
    try {

      const matches = await Match.findAll({ include:[
                                                      {
                                                        model: Participant,
                                                        include: [{
                                                          model:User,
                                                          attributes: ['name','username']
                                                        }]
                                                      },
                                                      {model: Boardgame, attributes: ['id_boardGame','name','min_players','max_players']}
                                                    ]});

      return matches;

    } catch (error) {
      
      throw new Error('Error fetching matchs: ' + error.message);

    }
  }

  async function getOpenMatches(){
    try {
        const matches = await Match.findAll({
                        where: { closed: false},
                        include:[
                                  {model: Participant,
                                    include: [{
                                      model:User,
                                      attributes: ['name','username']
                                    }]
                                  },
                                  {model: Boardgame, attributes: ['id_boardGame','name','min_players','max_players']}
                                ]
  })

        return matches
    } catch (error) {
        throw new Error("Error getting open Matches: " + error.message);
    }
  }

  async function getMatchById(id) {
    try {
      const match = await Match.findByPk(id,{ include:[
                                                      {
                                                        model: Participant,
                                                          include: [{
                                                            model:User,
                                                            attributes: ['name','username']
                                                          }]
                                                      },
                                                      {model: Boardgame, attributes: ['id_boardGame','name','min_players','max_players']}
                                                    ]});

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

      const deletedMatch = await Match.destroy({where: {id_match: id}});

      return deletedMatch;
    } catch (error) {
      throw new Error('Error deleting match: ' + error.message);
    }
  }

  async function countMatches(){
    try {
        const matches = await Match.count();

        return matches;

    } catch (error) {
        throw new Error("Error count loans");
        
    }
}

  module.exports = {
    createMatch,
    countMatches,
    getAllMatches,
    getOpenMatches,
    getMatchById,
    updateMatch,
    deleteMatch,
  };
