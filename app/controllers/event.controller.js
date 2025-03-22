// controllers/event.controller.js
const eventService = require('../services/event.service');
async function createEvent(req, res, next) {
    try {

        const eventData = req.body;

        const event = await eventService.createEvent(eventData);

        res.status(201).json({ success: true, event });

    } catch (error) {
        throw new Error("Error creating event: " + error );
    }
}

async function getAllEvents(req, res, next) {
    
    try {
    
        const events = await eventService.getAllEvents();
    
        res.status(200).json({ success: true, events });

    } catch (error) {
        throw new Error("Error fetching events: " + error);
        
    }
}

async function getEventById(req, res, next) {
    try {
        const eventId = req.params.id;
        const event = await eventService.getEventById(eventId);
        res.status(200).json({ success: true, event });
    } catch (error) {
        next(error);
    }
}

async function updateEvent(req, res, next) {
    try {
        const eventId = req.params.id;
        const eventData = req.body;
        const event = await eventService.updateEvent(eventId, eventData);
        res.status(200).json({ success: true, event });
    } catch (error) {
        next(error);
    }
}

async function deleteEvent(req, res, next) {
    try {
        const eventId = req.params.id;
        const result = await eventService.deleteEvent(eventId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
