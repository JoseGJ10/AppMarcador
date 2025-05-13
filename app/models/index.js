const path      = require('path');
const fs        = require('fs');
const basename  = path.basename(module.filename);
const config    = require('../config/config.json');
const db        = {};
const dotenv    = require('dotenv');

dotenv.config(); 

const env = process.env.NODE_ENV

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

 sequelize.sync({ alter: true }).then( ()=>{
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

    let noNullFKCascade = { 
        onUpdate: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: {
        allowNull: false 
        }
    }

    let FKAllownull = {
        foreignKey: {
            allowNull: true
        }
    }

    db.Role.hasMany(db.User,noNullFKCascade);
    db.User.belongsTo(db.Role, noNullFKCascade);

    db.User.hasMany(db.GamePlayer, noNullFKCascade);
    db.GamePlayer.belongsTo(db.User, noNullFKCascade);

    db.Boardgame.hasMany(db.Game,noNullFKCascade);
    db.Game.belongsTo(db.Boardgame, noNullFKCascade);

    db.User.hasMany(db.Loan,noNullFKCascade);
    db.Loan.belongsTo(db.User, noNullFKCascade);

    db.Boardgame.hasMany(db.Loan,noNullFKCascade);
    db.Loan.belongsTo(db.Boardgame, noNullFKCascade);

    db.Event.hasMany(db.Event_Participant,FKAllownull);
    db.Event_Participant.belongsTo(db.Event,FKAllownull);
    
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

