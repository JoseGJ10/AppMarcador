const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Participant = sequelize.define("Participant", {
        id_participant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jsonData: {
            type: DataTypes.JSON,
            allowNull: true
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        winner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: "participants",
        timestamps: true
    });

    return Participant;
};
