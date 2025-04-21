const { Loan } = require('../models');

async function createLoan (loanData) {

  try {

    const loan = await Loan.create(loanData);

    return loan;

  } catch (error) {

    throw new Error('Error creating loan: ' + error.message);

  }
};

async function getAllLoans () {

  try {

    const loans = await Loan.findAll();

    return loans;

  } catch (error) {

    throw new Error('Error fetching loans: ' + error.message);

  }
};

async function getLoanById (id) {

  try {

    const loan = await Loan.findByPk(id);

    if (!loan) {
      throw new Error('Loan not found');
    }

    return loan;

  } catch (error) {

    throw new Error('Error fetching loan: ' + error.message);

  }
};

async function updateLoan (id, loanData) {

  try {

    const loan = await Loan.findByPk(id);

    if (!loan) {
      throw new Error('Loan not found');
    }

    await loan.update(loanData);

    return loan;

  } catch (error) {

    throw new Error('Error updating loan: ' + error.message);

  }
};

async function deleteLoan (id) {

  try {

    const loan = await Loan.findByPk(id);

    if (!loan) {
      throw new Error('Loan not found');
    }

    const deletedLoan = await loan.destroy();

    return deletedLoan;
    
  } catch (error) {

    throw new Error('Error deleting loan: ' + error.message);

  }
};

async function countLoans(){
    try {
        const loans = await Loan.count();

        return loans;

    } catch (error) {
        throw new Error("Error count loans");
        
    }
}

module.exports = { 
    createLoan, 
    getAllLoans, 
    getLoanById, 
    updateLoan, 
    deleteLoan,
    countLoans
  };
