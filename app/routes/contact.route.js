const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller.js')
const { authenticate, authorization } = require('../middlewares/authmiddleware');

router.post('/create', contactController.newContact);

router.get('/',authenticate, authorization(['admin', 'moderator']) ,contactController.getAllContacts);

router.get('/:id',authenticate, authorization(['admin', 'moderator']) ,contactController.getOneContactById);

router.put('/update',authenticate, authorization(['admin', 'moderator']), contactController.updateDataContact);

router.delete('/delete',authenticate, authorization(['admin', 'moderator']), contactController.deleteOneContact);

module.exports = router