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

 sequelize.sync(/* { alter: false } */).then( ()=>{
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
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: false 
        }
    }

    let FKAllownull = {
        foreignKey: {
            allowNull: true
        }
    }

    /** Asociamos user con rol para el login y la gestion de permisos. */
    db.Role.hasMany(db.User,noNullFKCascade);
    db.User.belongsTo(db.Role, noNullFKCascade);

    /** Los usuarios pueden particioar en las partidas. */
    db.User.hasMany(db.Participant, noNullFKCascade);
    db.Participant.belongsTo(db.User, noNullFKCascade);

    /** El participante esta asociado a una partida */
    db.Match.hasMany(db.Participant, noNullFKCascade);
    db.Participant.belongsTo(db.Match, noNullFKCascade);

    /** Una partida se jugara sobre 1 juego seleccionado. */
    db.Boardgame.hasMany(db.Match,noNullFKCascade);
    db.Match.belongsTo(db.Boardgame, noNullFKCascade);

    /**  */
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

