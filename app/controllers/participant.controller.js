
const ParticipantService = require('../services/participant.service');
const matchService = require('../services/match.service')

async function createParticipant(req, res, next) {
    try {
      
      const participant = await ParticipantService.createParticipant(req.body);
      
      res.status(201).json({ success: true, participant });

    } catch (error) {

       next(error);

    }
}

async function getParticipantsByMatchId(req, res, next) {

    try {

        const participants = await ParticipantService.getParticipantsByMatchId(req.params.matchId);

        res.status(200).json({ success: true, participants });

    } catch (error) {

         next(error);
    }
}

async function getParticipantById(req, res, next) {
    try {

        const participant = await ParticipantService.getParticipantById(req.params.id);
        
        res.status(200).json({ success: true, participant });

    } catch (error) {

        next(error);
        
    }
}

async function updateParticipant(req, res, next) {
    try {
        
        const { jsonData = {}, score, winner } = req.body;
        const { id } = req.params
        
        const participant = await ParticipantService.updateParticipant(id, jsonData, score, winner);
        
        res.status(200).json({ success: true, participant });
        
    } catch (error) {
         next(error);
    }
}

async function deleteParticipant(req, res, next) {
try {

    const { id } = req.params;
    const userId = req.user.userId;

    const participant = await ParticipantService.getParticipantById(id);

    if (!participant){
        throw new error('Participante no encontrado en BBDD.')
    }
    const match = await matchService.getMatchById(participant.MatchIdMatch)

    const creator = match.Participants.find(p => p.creatorMatch);

    if(creator?.UserIdUser === participant.UserIdUser){
        const error = new Error("No puede eliminar al creador de la partida." );
        error.name = "UnauthorizedActionError"
        error.cause = { reason: "match_creator", userId: req.user.id };
        error.statusCode = 400
        throw error
    }

    if (participant.UserIdUser !== userId && creator?.UserIdUser !== userId){
        const error = new Error("No tienes permisos para borrar este participante");
        error.name = "UnauthorizedActionError"
        error.cause = { reason: "not_match_creator", userId: req.user.id };
        error.statusCode = 403
        throw error
    }

    await ParticipantService.deleteParticipant(id);

    res.status(200).json({ success: true, message: 'Participant deleted successfully' });

} catch (error) {
    next(error);
}
}


module.exports = {
    createParticipant,
    getParticipantsByMatchId,
    getParticipantById,
    updateParticipant,
    deleteParticipant,
}
