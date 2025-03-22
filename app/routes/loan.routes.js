const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan.controller.js');
const { authenticate, authorization } = require('../middlewares/authMiddleware');

// Ruta para crear un préstamo (solo para usuarios autenticados)
router.post('/', authenticate, authorization('admin', 'moderator'), loanController.createLoan);

// Ruta para obtener todos los préstamos (solo para usuarios autenticados)
router.get('/', authenticate, authorization('admin', 'moderator', 'user'), loanController.getAllLoans);

// Ruta para obtener un préstamo por ID (solo para usuarios autenticados)
router.get('/:id', authenticate, authorization('admin', 'moderator', 'user'), loanController.getLoanById);

// Ruta para actualizar un préstamo (solo para administradores)
router.put('/:id', authenticate, authorization('admin'), loanController.updateLoan);

// Ruta para eliminar un préstamo (solo para administradores)
router.delete('/:id', authenticate, authorization('admin'), loanController.deleteLoan);

module.exports = router;
