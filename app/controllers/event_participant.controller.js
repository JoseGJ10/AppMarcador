// controllers/eventParticipant.controller.js
const eventParticipantService = require('../services/event_participant.service.js');

async function createEventParticipant(req, res, next) {
    try {
        const eventParticipantData = req.body;
        const eventParticipant = await eventParticipantService.createEventParticipant(eventParticipantData);
        res.status(201).json({ success: true, eventParticipant });
    } catch (error) {
        next(error); // Enviamos el error al middleware de manejo de errores
    }
}

async function getAllEventParticipants(req, res, next) {
    try {
        const participants = await eventParticipantService.getAllEventParticipants();
        res.status(200).json({ success: true, participants });
    } catch (error) {
        next(error);
    }
}

async function getEventParticipantById(req, res, next) {
    try {
        const eventParticipantId = req.params.id;
        const participant = await eventParticipantService.getEventParticipantById(eventParticipantId);
        res.status(200).json({ success: true, participant });
    } catch (error) {
        next(error);
    }
}

async function updateEventParticipant(req, res, next) {
    try {
        const eventParticipantId = req.params.id;
        const updatedData = req.body;
        const participant = await eventParticipantService.updateEventParticipant(eventParticipantId, updatedData);
        res.status(200).json({ success: true, participant });
    } catch (error) {
        next(error);
    }
}

async function deleteEventParticipant(req, res, next) {
    try {
        const eventParticipantId = req.params.id;
        const result = await eventParticipantService.deleteEventParticipant(eventParticipantId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createEventParticipant,
    getAllEventParticipants,
    getEventParticipantById,
    updateEventParticipant,
    deleteEventParticipant
};
