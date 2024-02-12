
class Sockets {
    constructor( io ){
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection', ( client ) => {
            // Mini chat
            client.on('mensaje-to-server', (data) => {

                // client: solo envia el mensaje a este cliente que se conectó
                // client.emit('mensaje-from-server', data);

                //io: envia el mensaje a todos los conectados
                this.io.emit('mensaje-from-server', data);
            })
        });
    }
}

module.exports = Sockets;