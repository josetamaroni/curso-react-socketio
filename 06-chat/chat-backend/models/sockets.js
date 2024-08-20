const { usuarioConectado, usuarioDesconectado } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => {
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
            // Validar JWT Si el token no es valido, desconectar
            if (!valido){
                return socket.disconnect();
            }

            await usuarioConectado(uid);
            
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
            socket.on('disconnect', async ()=>{
                await usuarioDesconectado(uid);
            })

        });
    }


}


module.exports = Sockets;