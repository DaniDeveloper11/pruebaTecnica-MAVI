const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clientes');
const authRoutes = require('./routes/auth'); 
const sequelize = require('./config/database');
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


sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch(err => console.log('Error: ' + err));
