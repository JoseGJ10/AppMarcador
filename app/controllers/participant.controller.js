
const ParticipantService = require('../services/participant.service');

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
        const { jsonData, score, winner } = req.body;
        const participant = await ParticipantService.updateParticipant(req.params.id, jsonData, score, winner);
        res.status(200).json({ success: true, participant });
    } catch (error) {
         next(error);
    }
}

async function deleteParticipant(req, res, next) {
try {
    await ParticipantService.deleteParticipant(req.params.id);
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
