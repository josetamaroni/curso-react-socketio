// Servidor de Express
const express = require('express');
const app = express();

// Servidor de sockets
const server = require('http').createServer(app);

// Configuración del socket server
const io = require('socket.io')(server);

// Desplegar el directorio público
app.use( express.static( __dirname + '/public' ) )

io.on('connection', () => { 
    console.log('Cliente conectado!')
 });

server.listen(3000, ()=>{
    console.log('Server corriendo en puerto: 3000');
});