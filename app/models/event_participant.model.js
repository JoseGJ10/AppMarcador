const { DataTypes } = require("sequelize"); // Asegúrate de importar tu instancia de Sequelize

module.exports = (sequelize) => {

  const Event_Participant = sequelize.define("Event_Participant", {
    
    id_Event_Participant: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    guest_name:{
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    registered_at:{
        type: DataTypes.DATE,
        allowNull: false,
    }
  }, {
    tableName: "EventParticipants",
    timestamps: true, // Sequelize maneja `createdAt` y `updatedAt` automáticamente
    underscored: false, // Mantiene el formato camelCase en las columnas
  });

  return Event_Participant;
}