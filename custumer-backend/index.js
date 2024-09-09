const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clientes');
const authRoutes = require('./routes/auth'); 
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/auth', authRoutes); 

sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch(err => console.log('Error: ' + err));
