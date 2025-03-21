const path      = require('path');
const fs        = require('fs');
const basename  = path.basename(module.filename);
const config    = require('../config/config.json');
const db        = {};

const env = config['env']

const { database, username, password, host, dialect, port } = config[env]

const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(database, username, password, {
	logging: false,
	host, port, dialect,
	dialectOptions: {
		multipleStatements: true
	}
});

fs.readdirSync(__dirname).filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(function(file) {
	const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

applyRelationShip(db);

 sequelize.sync({ alter: false }).then( ()=>{
    console.log('Tables created');
}).catch( err => {
    console.error('Unable to create tables:', err);
}); 

async function insertBasicDbData() {
	
}

/**
 * Funcion donde se definen las relaciones de la BBDD.
 * 
 * @param {*} db 
 */
function applyRelationShip(db){

    db.Role.hasMany(db.User, { foreingKey: 'id_role' , onDelete: "CASCADE", onUpdate: "CASCADE", allowNull: false });
    db.User.belongsTo(db.Role, { foreingKey: 'id_role' , onDelete: "CASCADE", onUpdate: "CASCADE", allowNull: false });

    db.User.hasMany(db.GamePlayer, { foreingKey: 'id_user', onDelete: "CASCADE", onUpdate: "CASCADE", allowNull: false });
    db.GamePlayer.belongsTo(db.User, { foreingKey: 'id_user' , onDelete: "CASCADE", onUpdate: "CASCADE", allowNull: false });

    db.Boardgame.hasMany(db.Game, { foreignKey: "id_boardGame" , onDelete: "CASCADE", onUpdate: "CASCADE", allowNull: false });
    db.Game.belongsTo(db.Boardgame, { foreignKey: "id_boardGame", onDelete: "CASCADE", onUpdate: "CASCADE", allowNull: false });

}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

