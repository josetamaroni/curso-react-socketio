const { response } = require("express");
const Mensaje = require('../models/mensaje');


//! Funcion para obtener los mensajes del chat del usuario
const obtenerChat = async (req,res = response) => {

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        $or:[
            { de: miId, para: mensajesDe },
            { de: mensajesDe, para: miId }
        ]
    })
    .sort({createdAt: 'desc'})
    .limit(30);

    try {
      
        res.json({
            ok: true,
            mensajes: last30
        })

    } catch (error) {
        console.log('Error - controller - obtenerChat', error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    obtenerChat
}