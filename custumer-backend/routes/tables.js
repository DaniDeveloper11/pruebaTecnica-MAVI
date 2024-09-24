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

router.post('/:nombreTabla', async (req,res) => {
    const {nombreTabla} = req.params;
    const datos = req.body //Datos enviados en el curpo JSON

    try{
        //Verificar si la tabla existe
        const tableExists = await sequelizeDB2.query(`SHOW TABLES LIKE ?`, {
            replacements: [nombreTabla]
        });
        if(!tableExists[0].length){
            return res.status(404).json({msg: `La tabla ${nombreTabla} no existe` })
        }

        //Construimos la consulta dinamica
        const columns = Object.keys(datos).join(', ') //Obtiene las columnas
        const values = Object.values(datos).map(()=>'?').join(', ') //Mapear los valores con placeholders
        const replacements = Object.values(datos);//los valores reales que se insertaran
   
        const insertQuery = `INSERT INTO ${nombreTabla} (${columns}) VALUES (${values})`;

        // Ejecutar la inserción
        const result = await sequelizeDB2.query(insertQuery, {
            replacements: replacements,
            type: sequelizeDB2.QueryTypes.INSERT
        });

        //Devolver una respuesta exitosa
        res.status(201).json({msg: 'Registro añadido con exito', result});
    
    }catch(err){
        res.status(500).json({msg:'Hubo un error al insertar el registro', error:err.message});
    }
});

module.exports = router;
