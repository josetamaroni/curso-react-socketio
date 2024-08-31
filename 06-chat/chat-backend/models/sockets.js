const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets");
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

            // Unir al usuario a una sala de socket.io
            socket.join( uid );
            
            // Emitir todos los usuarios conectados
            this.io.emit( 'lista-usuarios', await getUsuarios() );
            
            // Escuchar cuando un usuario manda un mensaje
            socket.on('mensaje-personal', async ( payload ) => {
                const mensaje = await grabarMensaje(payload);
                this.io.to( payload.para ).emit('mensaje-personal', mensaje);
                this.io.to( payload.de ).emit('mensaje-personal', mensaje);
            });

            // Marcar en la base de dato que el usuario se desconecto
            // Disconnect / Emitir todos los usuarios conectados
            socket.on('disconnect', async ()=>{
                await usuarioDesconectado(uid);
                this.io.emit( 'lista-usuarios', await getUsuarios() );
            })
        });
    }
}

module.exports = Sockets;