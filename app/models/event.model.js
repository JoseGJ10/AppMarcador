const { DataTypes } = require("sequelize"); // Asegúrate de importar tu instancia de Sequelize

module.exports = (sequelize) => {

  const Event = sequelize.define("Event", {
    
    id_Event: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    visibility: {
      type: DataTypes.ENUM('public', 'private', 'secret'),
      defaultValue: 'private',
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: { // Categoria del evento
      type: DataTypes.ENUM('Torneo', 'Jornadas','Noches de juego','Presentaciones de juegos','Jornadas de puertas abiertas','Taller'),
      allowNull: false,
    },
    link :{ // Enlace a los formularios para apuntarse
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    capacity: { // Para los eventos con aforo limitado
      type: DataTypes.INTEGER,
      allowNull: true,
    }
    
  }, {
    tableName: "Events",
    timestamps: true, // Sequelize maneja `createdAt` y `updatedAt` automáticamente
    underscored: false, // Mantiene el formato camelCase en las columnas
  });

  return Event;
}