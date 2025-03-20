const { DataTypes } = require("sequelize"); // Asegúrate de importar tu instancia de Sequelize

module.exports = (sequelize) => {

  const Boardgame = sequelize.define("Boardgame", {
    
    id_boardGame: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    playtime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sleeves: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    premiun: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    N_A: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    wantSell: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sold: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    min_age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_players: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_players: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mainImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: "boardgames",
    timestamps: true, // Sequelize maneja `createdAt` y `updatedAt` automáticamente
    underscored: false, // Mantiene el formato camelCase en las columnas
  });

  return Boardgame;
}
