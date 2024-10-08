const jwt = require('jsonwebtoken');

//! Funcion para obtener un token
const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {
        const payload = { uid }
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        })
    })
}

const comprobarJWT = (token='') => {
    try {
        const { uid } = jwt.verify(token,process.env.JWT_KEY);
        
        return [true, uid];
    } catch (error) {
        console.log('Error - helpers - comprobarJWT', error);

        return [false, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}