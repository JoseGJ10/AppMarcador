const path      = require('path');
const fs        = require('fs');
const basename  = path.basename(module.filename);
const config    = require('../config/config.json');
const db        = {};

const env = config['env']

const { database, username, password, host, dialect } = config[env]

const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(database, username, password, {
	logging: false,
	host: host,
	dialect: dialect,
	dialectOptions: {
		multipleStatements: true
	}/*,
	pool: {
		max: 30, //max open
		min: 5, //min open
		idle: 20000, 
		evict: 15000,
		acquire: 30000
	  }*/
});

fs
.readdirSync(__dirname)
.filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(function(file) {
	const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

applyExtraSetup(db);

 sequelize
.sync({ alter: false })
.then( ()=>{
    console.log('Tables created');
    //createProject();
    //testJoin();
})
.catch( err => {
    console.error('Unable to create tables:', err);
}); 

// uncomment when doing "force: true"
// insertBasicDbData();

async function insertBasicDbData() {

	
}

/**
 * Funcion donde se definen las relaciones de la BBDD.
 * 
 * @param {*} db 
 */
function applyRelationShip(db){

    db.Role.hasMany(db.User, { foreingKey: 'id_role' });
    db.User.belongsTo(db.Role, { foreingKey: 'id_role' });

    db.User.hasMany(db.GamePlayer, { foreingKey: 'id_user' });
    db.GamePlayer.belongsTo(db.User, { foreingKey: 'id_user' });

    db.Boardgame.hasMany(db.Game, { foreignKey: "id_boardGame" });
    db.Game.belongsTo(db.Boardgame, { foreignKey: "id_boardGame", onDelete: "CASCADE", onUpdate: "CASCADE" });

}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

