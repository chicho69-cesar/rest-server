require('colors');
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Base de datos online'.green);
  } catch (error) {
    console.log(`${error}`.red);
    throw new Error('Error al iniciar la base de datos');
  }
}

module.exports = {
  dbConnection
}
