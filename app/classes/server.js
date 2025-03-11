const express = require('express');
const routes = require('../routes/index');
const { sequelize } = require('../models');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middlewares();
        this.routes();
    
    }

    middlewares(){

    }

    routes(){

        this.app.use('/api',routes);

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