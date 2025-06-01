const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    const Contact = sequelize.define('Contact', {
        id_contact: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        responded: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        tableName: "Contacts",
        timestamps: true,
        underscored: false,
    });

    return Contact;
}