// routes/event.routes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { authenticate, authorization } = require('../middlewares/authmiddleware'); // Middleware de autenticación

router.get('/', eventController.getAllEvents);

router.get('/:id', authenticate, eventController.getEventById);

router.post('/', authenticate, authorization('admin'), eventController.createEvent);

router.put('/:id', authenticate, authorization('admin'), eventController.updateEvent);

router.delete('/:id', authenticate, authorization('admin'), eventController.deleteEvent);

module.exports = router;
