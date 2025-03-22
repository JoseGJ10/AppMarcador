// service/boardgame.service.js
const { Boardgame } = require('../models'); // Asegúrate de que la ruta al modelo sea correcta

  async function getAllBoardgames() {
    try {
      const boardgames = await Boardgame.findAll();
      return boardgames;

    } catch (error) {
      
      throw new Error("Error fetching boardgames: " + error);
    }
  }

  async function getBoardgameById(id) {
    try {

      const boardgame = await Boardgame.findByPk(id);

      return boardgame;

    } catch (error) {

     throw new Error("Error fetching boardgame: " + error);
     

    }
  }

  async function createBoardgame(boardgameData) {
    try {
      const newBoardgame = await Boardgame.create(boardgameData);

      return newBoardgame;

    } catch (error) {

      throw new Error("Error creating boardgame" + error);
      

    }
  }

  async function updateBoardgame(id, boardgameData) {
    try {
      const boardgame = await Boardgame.findByPk(id);

      if (!boardgame) {
        throw new Error(`Boardgame with ID ${id} not found.`);
      }

      const updatedBoardgame = await boardgame.update(boardgameData);

        return updatedBoardgame;
  
    } catch (error) {
      throw new Error('Error updating boardgame: '+ error);
    }
  }

  async function deleteBoardgame(id) {
    try {
      const boardgame = await Boardgame.findByPk(id); 

      if (!boardgame) {
        throw new Error(`Boardgame with ID ${id} not found.`);
      }

      const deleteBoardgame = await boardgame.destroy();

      return deleteBoardgame;

    } catch (error) {
      
      throw new Error('Error deleting boardgame: ' + error);

    }
  }

module.exports = {
  getAllBoardgames,
  getBoardgameById,
  createBoardgame,
  updateBoardgame,
  deleteBoardgame,
};