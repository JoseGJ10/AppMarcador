const path      = require('path');
const fs        = require('fs');
const basename  = path.basename(module.filename);
const config    = require('../config/config.json');
const db        = {};

const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.database, config.user, config.password, {
	logging: false,
	host: config.database.host,
	dialect: config.database.dialect,
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

// handle UnhandledPromiseRejectionWarning messages (e.g. print full error, don't print anything, etc)

//process.on('unhandledRejection', (reason, p) => {
//	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//	// application specific logging, throwing an error, or other logic here
//});


// uncomment when doing "force: true"
// insertBasicDbData();

async function insertBasicDbData() {

	await sequelize.models.company_type.create({ id_company_type: 1, company_type: 'internal' });
	await sequelize.models.company_type.create({ id_company_type: 2, company_type: 'eecc' });
	
	await sequelize.models.company.create({ id_company: 1, companyName: 'Nokia', id_company_type:  '1' });
	await sequelize.models.company.create({ id_company: 2, companyName: 'TECSS', id_company_type: '1' });
	await sequelize.models.company.create({ id_company: 11, companyName: 'Test EECC', id_company_type: '2' });
	
	await sequelize.models.company.create({ companyName: "SOLUTIONS 30 IBERIA 2017, S.L", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "ARIX TELECOM SERVICIOS S.A.", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "ACTIVIDADES Y SERVICIOS DE", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "CEMESA TELECOMUNICACIONES SL", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "COMERCIAL TELEFONICA DE SISTEMAS Y", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "ENGINYERIA EMSER, S.L.", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "EUROPHONE ASISTENCIA TECNICA Y", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "FITEK TELECOMUNICACIONES S.L.", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "GALLEGA DE INSTALACIONES Y", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "GALLEGA DE SISTEMAS Y", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "INGENIERIA DE RADIO Y SISTEMAS DE", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "OFG ADQUISICIONES E INGENIERIA, S.L", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "REDES ECAPA SANFIL S.L", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "SERVITEL CONECTIUM WORLD MOBILE", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "SOLMUX COMUNICACIONES S.L.U.", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "TCR COMUNICACIONES, S.A.", id_company_type: '2' });
	await sequelize.models.company.create({ companyName: "TRIESA COMUNICACIONES", id_company_type: '2' });

	await sequelize.models.user.create({ id_user: 1, username: 'rolmosfe', passwordHash: '$2a$10$oFS7ZUPmNFr0q.xJ6rrcYuXcnnmOwllKPAZ84ZVmnyizdIOVmqvKa', firstName: 'Rodrigo', lastName: 'Olmos Fernandez', id_company: '2', email: '' });
	await sequelize.models.user.create({ id_user: 2, username: 'gonmanue', passwordHash: '$2a$10$oFS7ZUPmNFr0q.xJ6rrcYuXcnnmOwllKPAZ84ZVmnyizdIOVmqvKa', firstName: 'Manuel', lastName: 'Gonzalez Vallecillo', id_company: '2', email: '' });
	await sequelize.models.user.create({ id_user: 3, username: 'jgarciaj', passwordHash: '$2a$10$oFS7ZUPmNFr0q.xJ6rrcYuXcnnmOwllKPAZ84ZVmnyizdIOVmqvKa', firstName: 'Jose Luis', lastName: 'Garcia Jimenez', id_company: '2', email: '' });
	await sequelize.models.user.create({ id_user: 4, username: 'testUser', passwordHash: '$2a$10$oFS7ZUPmNFr0q.xJ6rrcYuXcnnmOwllKPAZ84ZVmnyizdIOVmqvKa', firstName: 'Test', lastName: 'User', id_company: '2', email: '' });
	await sequelize.models.user.create({ id_user: 5, username: 'eeccUser', passwordHash: '$2a$10$oFS7ZUPmNFr0q.xJ6rrcYuXcnnmOwllKPAZ84ZVmnyizdIOVmqvKa', firstName: 'EECC', lastName: 'User', id_company: '11', email: '' });
	
	await sequelize.models.role.create({ id_role: 1, roleName: 'full', roleDescription: 'global, all permissions' });
	await sequelize.models.role.create({ id_role: 2, roleName: 'internalUser', roleDescription: 'can see assigned projects, can\'t use Project Center' });
	await sequelize.models.role.create({ id_role: 3, roleName: 'externalUser', roleDescription: 'can see assigned projects only, and only for their own company' });
	await sequelize.models.role.create({ id_role: 4, roleName: 'usercenter', roleDescription: 'global, can open User Center' });
	await sequelize.models.role.create({ id_role: 5, roleName: 'eecc', roleDescription: 'EECC users with this role will only see rows from their own EECC', id_section: 482, filter_type: 'user company name' });		// i.e. filter 'EECC' section with companyName of logged in user
	await sequelize.models.role.create({ id_role: 35, roleName: 'romDc', roleDescription: "can only see rows where this user is the project's ROM/DC", id_section: 4, filter_type: 'user full name' });		// i.e. filter 'ROM/DC' section with lastName+firstName of logged in user
	await sequelize.models.role.create({ id_role: 31, roleName: 'projectAdmin', roleDescription: 'can only see own projects, can see everything inside own projects' });
	await sequelize.models.role.create({ id_role: 32, roleName: 'rom-dc', roleDescription: 'Sections: all, Items: can see own items' });
	await sequelize.models.role.create({ id_role: 33, roleName: 'ot', roleDescription: 'Items: can see own items' });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

