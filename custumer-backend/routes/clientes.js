const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Cliente } = require('../models');

// Crear un cliente
router.post('/',auth, async (req, res) => {
    try {
        const { name, plastname, mlastname, address, email } = req.body;
        const newClient = await Cliente.create({ name, plastname, mlastname, address, email });
        res.json(newClient);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Obtener todos los clientes
router.get('/',auth, async (req, res) => {
    try {
        const clients = await Cliente.findAll();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Obtener un cliente por ID
router.get('/:id',auth, async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Cliente.findByPk(id); // Buscar cliente por su ID
        if (!client) {
            return res.status(404).json({ msg: 'Client not found' }); // Si no existe, devolver 404
        }
        res.json(client); // Devolver los datos del cliente
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Manejar errores
    }
});



// Actualizar un cliente
router.put('/:id',auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, plastname, mlastname, address, email } = req.body;
        await Cliente.update({ name, plastname, mlastname, address, email }, { where: { id } });
        res.json({ msg: 'Client updated successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Eliminar un cliente
router.delete('/:id',auth, async (req, res) => {
    try {
        const { id } = req.params;
        await Cliente.destroy({ where: { id } });
        res.json({ msg: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
