const loanService = require('../services/loan.service.js');

// Crear un nuevo préstamo
const createLoan = async (req, res, next) => {

  try {

    const loanData = req.body;

    const loan = await loanService.createLoan(loanData);

    res.status(201).json({ success: true, data: loan });

  } catch (error) {
    next(error);
  }
};

// Obtener todos los préstamos
const getAllLoans = async (req, res, next) => {

  try {

    const loans = await loanService.getAllLoans();

    res.status(200).json({ success: true, data: loans });

  } catch (error) {

    next(error);

  }
};

// Obtener un préstamo por ID
const getLoanById = async (req, res, next) => {

  try {

    const loanId = req.params.id;

    const loan = await loanService.getLoanById(loanId);
    
    res.status(200).json({ success: true, data: loan });

  } catch (error) {

    next(error);

  }
};

// Actualizar un préstamo
const updateLoan = async (req, res, next) => {

  try {
    const loanId = req.params.id;
    const loanData = req.body;

    const loan = await loanService.updateLoan(loanId, loanData);

    res.status(200).json({ success: true, data: loan });

  } catch (error) {

    next(error);

  }
};

// Eliminar un préstamo
const deleteLoan = async (req, res, next) => {
  try {
    const loanId = req.params.id;

    const result = await loanService.deleteLoan(loanId);

    res.status(200).json(result);
  } catch (error) {

    next(error);
    
  }
};

module.exports = { createLoan, getAllLoans, getLoanById, updateLoan, deleteLoan };
