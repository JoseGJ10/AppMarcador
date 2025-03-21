const authRoutes = require("./auth.routes.js");
const boardGame = require("./boardGame.routes.js");
const gameRoutes = require("./game.routes.js");
const homeRoutes = require("./home.routes.js");
const userRoutes = require("./user.routes.js");
const roleRoutes = require('./role.routes.js');

module.exports = {
    authRoutes,  
    boardGame,
    gameRoutes,  
    homeRoutes,
    userRoutes,
    roleRoutes
 };
