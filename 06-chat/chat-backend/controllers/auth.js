const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");


//! Funcion para crear un usuario nuevo (Registrar Usuario)
const crearUsuario = async (req,res = response) => {

    try {
        const { email, password } = req.body;

        //* Validar que el email no exista en la BD
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }
        
        const usuario = new Usuario( req.body );
        
        //* Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //* Guardar usuario en la BD
        await usuario.save();
        
        //* Genero el token con la informacion del id del usuario
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log('Error - controller - crearUsuario', error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

//! Funcion para logearse 
const login = async (req,res = response) => {

    const { email, password } = req.body;

    try {
        //* Verificar si existe el email
        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            })
        }

        //* Verificar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok:false,
                msg:'Password no es correcto'
            })
        }

        //* Genero el token con la informacion del id del usuario
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    } catch (error) {
        console.log('Error - controller - crearUsuario', error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const renewToken = async (req,res = response) => {

    const uid = req.uid;

    //* Genero el token con la informacion del id del usuario
    const token = await generarJWT( uid );

    // Obteneer el usuario por UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        uid,
        usuario,
        token
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}