// *  path: /api/mensajes

const { Router } = require('express');
// const { check } = require('express-validator');
// const { crearUsuario, login, renewToken } = require('../controllers/auth');
// const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');

const router = Router();


// Obtener los mensajes
router.get('/:de', [
    validarJWT
],obtenerChat)

module.exports = router;