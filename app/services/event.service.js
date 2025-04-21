// services/event.service.js
const { Event } = require('../models'); // Importamos el modelo de Event
async function createEvent(eventData) {
    try {
        const event = await Event.create(eventData);
        return event;
    } catch (error) {
        throw new Error('Error creating event: ' + error.message);
    }
}

async function getAllEvents() {
    try {
        const events = await Event.findAll();
        return events;
    } catch (error) {
        throw new Error('Error fetching events: ' + error.message);
    }
}

async function getEventById(eventId) {
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    } catch (error) {
        throw new Error('Error fetching event: ' + error.message);
    }
}

async function updateEvent(eventId, eventData) {
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        await event.update(eventData);
        return event;
    } catch (error) {
        throw new Error('Error updating event: ' + error.message);
    }
}

async function deleteEvent(eventId) {
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        await event.destroy();
        return { message: 'Event deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting event: ' + error.message);
    }
}

async function countEvents(){
    try {
        const events = await Event.count();

        return events;

    } catch (error) {
        throw new Error('Error count events: ' + error.message);
    }
}

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, countEvents };
