const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { sequelize } = require('../models');  // Asegúrate de importar la conexión a la base de datos

// Obtener todas las tablas de la base de datos
router.get('/',auth, async (req, res) => {
    try {
        // La consulta SHOW TABLES muestra todas las tablas en la base de datos
        const [tables] = await sequelize.query("SHOW TABLES");
        res.json(tables);  // Devolver la lista de tablas en formato JSON
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Obtener los registros de una tabla según su nombre
router.get('/:nombreTabla', async (req, res) => {
    const { nombreTabla } = req.params;

    try {
        // Usa replacements para pasar el nombre de la tabla de manera segura
        const [results] = await sequelize.query(`SELECT * FROM ${nombreTabla}`);
        
        if (results.length === 0) {
            return res.status(404).json({ msg: `No se encontraron registros en la tabla ${nombreTabla}` });
        }

        res.json(results);  // Retorna los registros de la tabla
    } catch (err) {
        res.status(500).json({ msg: 'Hubo un error al obtener los datos de la tabla', error: err.message });
    }
});
module.exports = router;
