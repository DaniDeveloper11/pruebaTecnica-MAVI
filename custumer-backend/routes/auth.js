const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear el usuario
        const newUser = await Usuario.create({ name, email, password });
        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});



// Login de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Crear el token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token válido por 1 hora
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
