const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Role = sequelize.define(
        "Role",
        {
            id_role: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false, unique: true }
        },
        {
            tableName: "roles",
            timestamps: false
        }
    );

    return Role;
};
