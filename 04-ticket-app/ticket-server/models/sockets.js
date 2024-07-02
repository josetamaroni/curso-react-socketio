const TicketList = require('./ticket-list');

class Sockets {

    constructor( io ) {

        this.io = io;

        //* Crear una nueva instancia de nuestro ticketList
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log( 'usuario conectado' );
            
            //* Escuchar evento: solicitar-ticket
            socket.on('solicitar-ticket', ( data, callBack ) => {
                const nuevoTicket = this.ticketList.crearTicket();
                callBack( nuevoTicket );                
            });

            //* Escuchar evento: siguiente-ticket-trabajar
            socket.on('siguiente-ticket-trabajar', ( { agente, escritorio }, callBack ) => {
                const suTicket = this.ticketList.asignarEscritorio( agente, escritorio );
                callBack( suTicket );

                this.io.emit('ticket-asignado', this.ticketList.ultimos13)
            });
        });
    }
}

module.exports = Sockets;