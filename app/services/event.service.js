// services/event.service.js
const { Event } = require('../models'); // Importamos el modelo de Event
const { Op } = require('sequelize');

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

async function getPaginatedEvents(page, pageSize, eventTitle, date, sortBy, sortDirection){
    try {
        const limit = parseInt(pageSize,10);
        const offset = 0 + (parseInt(page,10) -1 ) * limit
        const where = {};
        const order = [];

        const columnsList = ['id_event','name','location','category','capacity']

        if (eventTitle){
            where.title = {
                [Op.like]: `%${eventTitle}%`
            };
        }

        if(date){
            where.date = date;
        }

        if (sortBy && columnsList.includes(sortBy)){
            order.push([sortBy, sortDirection === 'desc' ? 'DESC' : 'ASC']);
        }

        if (order.length == 0){
            order.push(['name', 'ASC']);
        }

        const events = await Event.findAndCountAll({
            where,
            offset,
            limit,
            order,
        });

        return events;

    } catch (error) {
        throw new Error("Error Fetching paginated Events: " + error.message);
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

module.exports = { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent, 
    countEvents,
    getPaginatedEvents 
};
