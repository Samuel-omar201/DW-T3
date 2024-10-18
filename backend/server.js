const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para parsear JSON en las peticiones

// Rutas
app.use('/users', usersRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
