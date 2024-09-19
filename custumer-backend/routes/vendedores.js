const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Vendedor } = require('../models');

// Crear un vendedor
router.post('/', auth, async (req, res) => {
    try {
        const { name, email, phone_number } = req.body;
        const newVendedor = await Vendedor.create({ name, email, phone_number });
        res.json(newVendedor);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Obtener todos los vendedores
router.get('/', async (req, res) => {
    try {
        const vendedores = await Vendedor.findAll();
        res.json(vendedores);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Obtener un vendedor por ID
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const vendedor = await Vendedor.findByPk(id); // Buscar vendedor por su ID
        if (!vendedor) {
            return res.status(404).json({ msg: 'Vendedor no encontrado' }); // Si no existe, devolver 404
        }
        res.json(vendedor); // Devolver los datos del vendedor
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Manejar errores
    }
});

// Actualizar un vendedor
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone_number } = req.body;
        await Vendedor.update({ name, email, phone_number }, { where: { id } });
        res.json({ msg: 'Vendedor actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Eliminar un vendedor
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        await Vendedor.destroy({ where: { id } });
        res.json({ msg: 'Vendedor eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
