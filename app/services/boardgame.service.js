// service/boardgame.service.js
const { Boardgame } = require('../models'); // Asegúrate de que la ruta al modelo sea correcta

const BoardgameService = {
  async getAllBoardgames() {
    try {
      const boardgames = await Boardgame.findAll();
      return boardgames;
    } catch (error) {
      throw error;
    }
  },

  async getBoardgameById(id) {
    try {
      const boardgame = await Boardgame.findByPk(id);
      return boardgame;
    } catch (error) {
      throw error;
    }
  },

  async createBoardgame(boardgameData) {
    try {
      const newBoardgame = await Boardgame.create(boardgameData);
      return newBoardgame;
    } catch (error) {
      throw error;
    }
  },

  async updateBoardgame(id, boardgameData) {
    try {
      const [updatedRows] = await Boardgame.update(boardgameData, {
        where: { id_boardGame: id },
      });
      if (updatedRows > 0) {
        const updatedBoardgame = await Boardgame.findByPk(id);
        return updatedBoardgame;
      }
      return null; // Indica que no se encontró el boardgame para actualizar
    } catch (error) {
      throw error;
    }
  },

  async deleteBoardgame(id) {
    try {
      const deletedRows = await Boardgame.destroy({
        where: { id_boardGame: id },
      });
      return deletedRows > 0; // Devuelve true si se eliminó el boardgame
    } catch (error) {
      throw error;
    }
  },
};

module.exports = BoardgameService;