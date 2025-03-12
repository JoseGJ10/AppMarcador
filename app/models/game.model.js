const { DataTypes } = require("sequelize"); // Asegúrate de importar tu instancia de Sequelize
const Boardgame = require("./Boardgame"); // Importa el modelo de Boardgame

const Game = sequelize.define("Game", {
  id: {
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
  BoardGameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Boardgame,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: "game",
  timestamps: true, // Sequelize manejará `createdAt` y `updatedAt`
  underscored: false, // Mantiene el formato camelCase en las columnas
});

// Definir la relación con Boardgame
Game.belongsTo(Boardgame, { foreignKey: "BoardGameId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Boardgame.hasMany(Game, { foreignKey: "BoardGameId" });

module.exports = Game;
