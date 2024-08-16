const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {
    try {
        const token = req.header('x-token');
        if (!token) {
            res.status(401).json({
                ok:false,
                msg: 'Token no existe'
            });
        }

        const payload = jwt.verify( token, process.env.JWT_KEY );
        req.uid = payload.uid;
        next()
        
    } catch (error) {
        console.log('Error - controller - validarJWT', error);
        res.status(401).json({
            ok:false,
            msg: 'Token no es válido'
        });
    }
}

module.exports = {
    validarJWT
}