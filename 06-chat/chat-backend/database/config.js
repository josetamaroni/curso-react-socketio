const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CON_STR, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error)
        throw new Error('Error en la base de datos - vea logs');
    }
}

module.exports = {
    dbConnection
}