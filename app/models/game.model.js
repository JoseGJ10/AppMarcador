const { DataTypes } = require("sequelize"); // Asegúrate de importar tu instancia de Sequelize

module.exports = (sequelize) => {
  const Game = sequelize.define("Game", {
    id_game: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: "games",
    timestamps: true, // Sequelize manejará `createdAt` y `updatedAt`
    underscored: false, // Mantiene el formato camelCase en las columnas
  });

  return Game;

}




