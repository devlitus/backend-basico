// Configuración Conección con la base de datos Mongo Atlas
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error en la base de datps - Hable con el admin');
  }
}

module.exports = {
  dbConnection
}