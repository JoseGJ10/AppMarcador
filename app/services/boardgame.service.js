// service/boardgame.service.js
const { Boardgame } = require('../models');
const { Op, NotNull } = require('sequelize'); // Asegúrate de que la ruta al modelo sea correcta

  async function getPaginatedBoardgames(page, pageSize,name, sortBy, sortDirection) {
    try {
      const limit = parseInt(pageSize,10);
      const offset = 0 + (parseInt(page,10) -1 ) * limit
      const where = {};
      const order = [];

      if (name) {
        where.name = {
          [Op.like]: `%${name}%`, // Op.iLike para búsqueda insensible a mayúsculas
        };
      }

      // Ordenamiento (si se proporciona)
      if (sortBy && ['name', 'genre', /* ... otros campos por los que ordenar ... */].includes(sortBy)) {
        order.push([sortBy, sortDirection === 'desc' ? 'DESC' : 'ASC']);
      } else {
        order.push(['name', 'ASC']); // Ordenamiento por defecto
      }


      const boardgames = await Boardgame.findAndCountAll({
        where,
        offset,
        limit,
        order,
      });

      return boardgames;

    } catch (error) {
      
      throw new Error("Error fetching boardgames: " + error);
    }
  }

  async function getAllBoardgames(){
    try {
        const boardGames = await Boardgame.findAll();

        return boardGames;

    } catch (error) {
        throw new Error('Error Get all BoardGames.')
    }
  }

  async function getAllBoardGamesImagesFromDB(){
    try {
      
        const boardgames = await Boardgame.findAll({
          attributes: ['mainImage'],
          where: {mainImage: { [Op.not]: null } }
        })

        // return boardgames.map(boardgame => boardgame.mainImage).filter(img => !!img);
        return boardgames.map(boardgame => boardgame.mainImage);
    } catch (error) {
        throw new Error("Error fetching images from boardgame Table.");
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

  async function countGames(){
    try {
        const boardGames = Boardgame.count();

        return boardGames;
    } catch (error) {
      throw new Error('Error count boardgames: ' + error);
    }
  }

module.exports = {
  getAllBoardgames,
  getPaginatedBoardgames,
  getBoardgameById,
  getAllBoardGamesImagesFromDB,
  createBoardgame,
  updateBoardgame,
  deleteBoardgame,
  countGames
};