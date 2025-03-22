const { DataTypes } = require("sequelize"); // Asegúrate de importar tu instancia de Sequelize

module.exports = (sequelize) => {

  const Loan = sequelize.define("Loan", {
    
    id_Loan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    loan_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active','returned','overdue'),
      allowNull: false,
      defaultValue: 'active',
    }
  }, {
    tableName: "loans",
    timestamps: true, // Sequelize maneja `createdAt` y `updatedAt` automáticamente
    underscored: false, // Mantiene el formato camelCase en las columnas
  });

  return Loan;
}