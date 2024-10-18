const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsers = async () => {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return []; // Si hay un error, devuelve un arreglo vacío
    }
};

const writeUsers = async (users) => {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};

router.post('/register', async (req, res) => {
    const { name, dpi, email, password } = req.body;
    const users = await readUsers();

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'Email ya registrado' });
    }

    const newUser = { name, dpi, email, password };
    users.push(newUser);
    await writeUsers(users);
    res.status(201).json(newUser);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = await readUsers();

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.status(200).json(user);
});

module.exports = router;
