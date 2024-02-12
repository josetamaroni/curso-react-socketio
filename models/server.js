// Servidor de Express
const express = require('express');
// Servidor de sockets
const http = require('http');
// Configuración del socket server
const socketio = require('socket.io');
const path = require('path');

const Sockets = require('./sockets');


class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        // Configuración del sockets
        this.io = socketio(this.server , { /*configuraciones*/ });
    }

    middlewares(){
        // Desplegar el directorio público
        this.app.use(express.static( path.resolve(__dirname, '../public') ));
    }

    configurarSockets(){
        new Sockets( this.io );
    }

    execute(){

        // Inicializar middlewares
        this.middlewares();

        // Inicializar Socket
        this.configurarSockets();

        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }
}

module.exports = Server;