const BoardgameService = require('../services/boardgame.service');

  async function getPaginatedBoardgames(req, res, next) {
    try {
      
      const { page, pageSize, name, sortBy, sortDirection } = req.query


      if (isNaN(page) || isNaN(pageSize)){
        throw new Error("Error al proporcionar la pagina o el tamaño de pagina.");
      }

      const boardgames = await BoardgameService.getPaginatedBoardgames(page, pageSize,name, sortBy, sortDirection);
      res.status(200).json({success: true, data: boardgames});

    } catch (error) {
      
      next(error);
    
    }
  }

  async function getBoardgameById(req, res, next) {
    const { id } = req.params;
    try {
      const boardgame = await BoardgameService.getBoardgameById(id);
      if (boardgame) {
        res.status(200).json({success: true, data: boardgame});
      } else {
        res.status(404).json({ success: false, message: `Boardgame with ID ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  }

  async function createBoardgame(req, res, next) {
    
    const  { name, description, playtime, info,
      min_age, min_players, max_players,
      sleeves, premiun, N_A, wantSell, sold } = req.body;
    
    const mainImage = req.file ? req.file.filename : null;

    try {

      const newBoardgame = await BoardgameService.createBoardgame({
        name, description, playtime, info,
        min_age, min_players, max_players,
        sleeves, premiun, N_A, wantSell, sold,
        mainImage
      });

      res.status(201).json({success: true, data:newBoardgame});

    } catch (error) {

      next(error);
      
    }

  }

  async function updateBoardgame(req, res, next) {
    const { id } = req.params;
    let updateData = {};
    const  { name, description, playtime, info,
      min_age, min_players, max_players,
      sleeves, premiun, N_A, wantSell, sold } = req.body;

    const mainImage = req.file ? req.file.filename : null;
    
    // Si no se modifica la imagen no actualizamos el valor.
    if (mainImage !== null) {
       updateData = {name, description, playtime, info,
        min_age, min_players, max_players,
        sleeves, premiun, N_A, wantSell, sold,
        mainImage}
    } else {
      updateData = {name, description, playtime, info,
        min_age, min_players, max_players,
        sleeves, premiun, N_A, wantSell, sold}
    }

    try {
      const updatedBoardgame = await BoardgameService.updateBoardgame(id, updateData);
      if (updatedBoardgame) {
        res.status(200).json({success: true, data:updatedBoardgame});
      } else {
        res.status(404).json({ success: false, message: `Boardgame with ID ${id} not found.` });
      }
    } catch (error) {
      next(error);
    }
  }

  async function deleteBoardgame(req, res, next) {

    const { id } = req.params;

    try {

      const deleted = await BoardgameService.deleteBoardgame(id);

      res.status(204).send({success: true, data:deleted}); 

    } catch (error) {
      next(error);
    }
  }


module.exports = {
  // ToDo getAllBoardgames,
  getPaginatedBoardgames,
  getBoardgameById,
  createBoardgame,
  updateBoardgame,
  deleteBoardgame,
};