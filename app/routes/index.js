const authRoutes = require("./auth.routes.js");
const boardGameRoutes = require("./boardGame.routes.js");
const eventParticipantRoutes = require("./event_participant.routes.js");
const eventRoutes = require("./event.routes.js");
const homeRoutes = require("./home.routes.js");
const loanRoutes = require("./loan.routes.js");
const matchRoutes = require("./match.routes.js");
const participantRoutes = require("./participant.routes.js");
const roleRoutes = require('./role.routes.js');
const userRoutes = require("./user.routes.js");

module.exports = {
    authRoutes,
    boardGameRoutes,
    eventParticipantRoutes,
    eventRoutes,
    homeRoutes,
    loanRoutes,
    matchRoutes,
    participantRoutes,
    roleRoutes,
    userRoutes,
 };
