// controllers/event.controller.js
const eventService = require('../services/event.service');

async function createEvent(req, res, next) {
    try {

        const {name,description,date,time,location,visibility,category,link,capacity} = req.body;

        const image =  req.file ? req.file.filename : null;

        const event = await eventService.createEvent({name,description,date,time,location,visibility,category,link,capacity,image});

        res.status(201).json({ success: true, data: event });

    } catch (error) {
        throw new Error("Error creating event: " + error );
    }
}

async function getAllEvents(req, res, next) {
    
    try {
    
        const events = await eventService.getAllEvents();
    
        res.status(200).json({ success: true, data: events });

    } catch (error) {
        throw new Error("Error fetching events: " + error);
        
    }
}

async function getHomeEvents(req,res,next){
    try {
        const eventsHome = await eventService.getHomeEvents();



        res.status(200).json({success: true, data: eventsHome});
    } catch (error) {
        next(error)
    }
}

async function getPaginatedEvents(req,res,next){
    try {
        
        let {page, pageSize, filterName, filterDate, sortBy, sortDirection} = req.query;

        if(isNaN(page)){
            page = 1
        } 
        if(isNaN(pageSize)){
            pageSize = 10
        }

        const events = await eventService.getPaginatedEvents(page, pageSize, filterName, filterDate, sortBy, sortDirection)

        res.status(200).json({success: true, data: events});

    } catch (error) {
        next(error);
    }
}

async function getEventById(req, res, next) {
    try {
        const eventId = req.params.id;
        const event = await eventService.getEventById(eventId);
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        next(error);
    }
}

async function updateEvent(req, res, next) {
    try {
        let event;
        const eventId = req.params.id;
        
        const {name,description,date,time,location,visibility,category,link,capacity} = req.body;
        
        const image =  req.file ? req.file.filename : null;

        if (image !== null){
            event = await eventService.updateEvent(eventId, {name,description,date,time,location,visibility,category,link,capacity,image});
        } else {
            event = await eventService.updateEvent(eventId, {name,description,date,time,location,visibility,category,link,capacity});
        }
        
        res.status(200).json({ success: true, data: event });

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

module.exports = { 
    createEvent, 
    getAllEvents, 
    getEventById,
    getPaginatedEvents,
    getHomeEvents,
    updateEvent, 
    deleteEvent };
