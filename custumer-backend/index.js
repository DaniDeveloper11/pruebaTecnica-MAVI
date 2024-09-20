const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clientes');
const authRoutes = require('./routes/auth'); 
const {sequelize,sequelizeDB2} = require('./config/database');
const vendedorRoutes = require('./routes/vendedores')
const tableRoutes = require('./routes/tables')

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/auth', authRoutes); 
app.use('/api/vendedores', vendedorRoutes);
app.use('/api/tables', tableRoutes);


// Sincronizar la primera base de datos (local)
sequelize.sync()
    .then(() => {
        console.log('Base de datos local conectada');
        return sequelizeDB2.sync(); // Sincronizar la segunda base de datos (remota)
    })
    .then(() => {
        console.log('Base de datos remota conectada');
        app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
    })
    .catch(err => console.log('Error: ' + err));