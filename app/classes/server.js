const express = require('express');
const cors = require('cors');
const { 
    authRoutes,
    boardGameRoutes,
    eventParticipantRoutes,
    eventRoutes,
    gameRoutes,
    gamePlayerRoutes,
    homeRoutes,
    loanRoutes,
    roleRoutes,
    userRoutes,
 } = require("../routes");
const { sequelize } = require('../models');
const errorHandler = require('../middlewares/errorHandler');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middlewares();
        this.routes();
        this.errorHandler();
    
    }

    middlewares(){
        this.app.use(cors()); 
        this.app.use(express.json());
    }

    routes(){

        this.app.use("/api/auth" , authRoutes);
        this.app.use("/api/boardgame",boardGameRoutes);
        this.app.use("/api/eventParticipant",eventParticipantRoutes);
        this.app.use("/api/event", eventRoutes);
        this.app.use("/api/game" , gameRoutes);
        this.app.use("/api/gamePlayer",gamePlayerRoutes);
        this.app.use("/api/home" , homeRoutes);
        this.app.use("/api/rol"  , roleRoutes);
        this.app.use("/api/user" , userRoutes);
        this.app.use("/api/loan" , loanRoutes);

    }

    errorHandler() {
        this.app.use(errorHandler);
    }

    async start(){

        try {
            
            await sequelize.authenticate();
            console.log('✅ Conexión a la base de datos establecida correctamente.');
        
            await sequelize.sync({ alter: true }); // Crea/Actualiza las tablas
            console.log('✅ Modelos sincronizados con la base de datos.');

            
            this.app.listen(this.port, () => {
                
                console.log('Servidor iniciado en el puerto: ', this.port);
    
            }).on('error', (err) => {
                
                console.error('Error al inicializar el servidor:' , err);
    
            });
            
        } catch (error) {
            console.error('❌ Error al conectar con la base de datos:', error);
        }

    }

}

module.exports = Server;