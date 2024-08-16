// *  path: /api/login

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear nuevos usuarios
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty().isLength({ min: 6 }),
    validarCampos
],crearUsuario)


// Login post( path, [middlewares], controller ) los middlewares se ejecutan antes del controlador
router.post('/', [
    // Validar que el usuario tenga un email y un password
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login)


// Revalidar Token
router.get('/renew', [
    validarJWT
],renewToken)


module.exports = router;