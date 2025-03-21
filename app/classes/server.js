const express = require('express');
const { userRoutes, gameRoutes, homeRoutes,roleRoutes } = require("../routes");
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
        this.app.use(express.json());
    }

    routes(){

        this.app.use("/api/user", userRoutes);
        this.app.use("/api/game", gameRoutes);
        this.app.use("/api/home", homeRoutes);
        this.app.use("/api/rol", roleRoutes);

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