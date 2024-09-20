const express = require('express');
const router = express.Router();
const { sequelizeDB2 } = require('../config/database');  // Importamos la conexión a la segunda base de datos

router.get('/', async (req, res) => {
    try {
        // Verificamos la consulta en la segunda base de datos
        const [tables] = await sequelizeDB2.query("SHOW TABLES");
        res.json(tables);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.get('/:nombreTabla', async (req, res) => {
    const { nombreTabla } = req.params;

    try {
        // Consulta dinámica en la segunda base de datos
        const [results] = await sequelizeDB2.query(`SELECT * FROM ${nombreTabla} LIMIT 10`);
        res.json(results);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
