const { Sequelize } = require('sequelize');
require('dotenv').config();

// Conexión a la primera base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Conexión a la segunda base de datos
const sequelizeDB2 = new Sequelize(process.env.DB2_NAME, process.env.DB2_USER, process.env.DB2_PASS, {
    host: process.env.DB2_HOST,
    port: process.env.DB2_PORT || 3306, // Usa el puerto 3306
    dialect: 'mysql',
    logging: false,
});

// Verificar conexión a la primera base de datos
sequelize.authenticate()
    .then(() => console.log('Conectado a la primera base de datos'))
    .catch(err => console.error('Error al conectar a la primera base de datos:', err));

// Verificar conexión a la segunda base de datos
sequelizeDB2.authenticate()
    .then(() => console.log('Conectado a la segunda base de datos'))
    .catch(err => console.error('Error al conectar a la segunda base de datos:', err));

module.exports = { sequelize, sequelizeDB2 };
