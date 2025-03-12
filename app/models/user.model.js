const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            username: { type: DataTypes.STRING, allowNull: false, unique: true },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
            avatar: { type: DataTypes.STRING }, // Ruta de la imagen de perfil
            roleId: { 
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "roles", key: "id" } // Clave foránea
            }
        },
        {
            tableName: "users",
            timestamps: false
        }
    );

    // Definir relación en una función estática
    User.associate = (models) => {
        User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
    };

    return User;
};

