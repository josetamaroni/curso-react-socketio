const Server = require("./models/server");
require('dotenv').config();

const server = new Server();

server.execute();

// io.on('connection', ( client ) => { 
//     // console.log(client.id)

//     // Emitir mensaje al cliente
//     // client.emit('mensaje-bienvenida', {
//     //     msg: 'Bienvenido al Server',
//     //     fecha: new Date()
//     // });

//     // Escuchar mensaje del cliente
//     // client.on('mensaje-cliente', ( data )=>{
//     //     console.log('Mensaje desde el cliente', {data})
//     // })


//     // Mini chat
//     client.on('mensaje-to-server', (data) => {
//         console.log('Mensaje desde el cliente', {data})

//         // client: solo envia el mensaje a este cliente que se conectó
//         // client.emit('mensaje-from-server', data);

//         //io: envia el mensaje a todos los conectados
//         io.emit('mensaje-from-server', data);

//     })

// });