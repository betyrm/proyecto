
const express = require('express');
//const handlebars = require('express-handlebars');
require('dotenv').config();
PORT = process.env.PORT || 8080;

const cors = require('cors');

//Conexión a la DB de Mogo local
require('./database/conexion');
const PersonaController = require('./controllers/persona');


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' //Dirección del front
}))


//Endpoints:
app.get('/', async (req, res) => {
    res.json({
        personas: await PersonaController.findAll()
    });
});

app.post('/crear', async (req, res) => {
    await PersonaController.create(req.body);
    res.json('Usuario Creado y guardado en DB');
});



app.listen(PORT, () => {
    console.log(`Servidor escuchando por el Puerto: ${PORT}`);
});







