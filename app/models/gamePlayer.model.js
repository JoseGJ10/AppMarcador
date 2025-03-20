const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const GamePlayer = sequelize.define("GamePlayer", {
        id: {
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
        tableName: "game_players",
        timestamps: false
    });

    return GamePlayer;
};
