

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            //TODO: Validar JWT
            // Si el token no es valido, desconectar
            
            //TODO: Saber que usuario esta activo mediante el UID

            //TODO: Emitir todos los usuarios conectados

            //TODO: Socket Join, uid

            //TODO: Escuchar cuando un usuario manda un mensaje
            // socket.on('mensaje-personal', ( data ) => {
            //     console.log( data );
            //     this.io.emit('mensaje-from-server', data );
            // });

            //TODO: Disconnect
            // Marcar en la base de dato que el usuario se desconecto
            //TODO: Emitir todos los usuarios conectados

        });
    }


}


module.exports = Sockets;