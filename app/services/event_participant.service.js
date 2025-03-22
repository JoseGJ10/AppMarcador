// services/eventParticipant.service.js
const { Event_Participant } = require('../models'); 

async function createEventParticipant(eventParticipantData) {

    try {
        const eventParticipant = await Event_Participant.create(eventParticipantData);

        return eventParticipant;

    } catch (error) {

        throw new Error("Error creating Event participant: " + error);

    }
}

async function getAllEventParticipants() {
    try {

        const participants = await Event_Participant.findAll();

        return participants;

    } catch (error) {

        throw new Error("Error fetching Event participants: " + error);

    }
}

async function getEventParticipantById(id) {
    try {

        const participant = await Event_Participant.findByPk(id);

        if (!participant) {

            throw new Error('Event participant not found');

        }

        return participant;

    } catch (error) {

        throw new Error("Error fetching Event participant: " + error);

    }
}

async function updateEventParticipant(id, updatedData) {

    try {

        const participant = await Event_Participant.findByPk(id);

        if (!participant) {

            throw new Error('Event participant not found');

        }

        return participant.update(updatedData);

    } catch (error) {

        throw new Error("Error fetching Event participants: " + error);

    }
}

async function deleteEventParticipant(id) {
    try {

        const participant = await Event_Participant.findByPk(id);

        if (!participant) {
            throw new Error('Event participant not found');
        }
        const deleteEventParticipant = await participant.destroy();

        return deleteEventParticipant;

    } catch (error) {
        throw new Error("Error deleting Event participant: " + error);   
    }
}

module.exports = {
    createEventParticipant,
    getAllEventParticipants,
    getEventParticipantById,
    updateEventParticipant,
    deleteEventParticipant
};
