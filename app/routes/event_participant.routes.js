const express = require('express');
const router = express.Router();
const eventParticipantController = require('../controllers/event_participant.controller.js');
const { authenticate, authorization } = require('../middlewares/authmiddleware');  // Importamos los middleware

router.post('/', authenticate, authorization('admin'), eventParticipantController.createEventParticipant);

router.get('/', authenticate, eventParticipantController.getAllEventParticipants);

router.get('/:id', authenticate, eventParticipantController.getEventParticipantById);

router.put('/:id', authenticate, authorization('admin'), eventParticipantController.updateEventParticipant);

router.delete('/:id', authenticate, authorization('admin'), eventParticipantController.deleteEventParticipant);

module.exports = router;

