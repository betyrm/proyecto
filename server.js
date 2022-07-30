
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

/* app.post('/crear', async (req, res) => {
    const { dni} = req.body;
    
    try {
        const persona = await PersonaController.findByDni(dni.trim());
    if (persona) {
        
        await PersonaController.update(persona._id, req.body);
        res.status(200).json("Usuario editado y guardado en BD");
    }else {
        await PersonaController.create(req.body);
        res.status(200).json("Usuario creado y guardado en BD");
        }
    }catch (error) {
        res.status(400).json(error);
     }
        
}); */
app.post("/crear", async (req, res) => {
    const { dni } = req.body;
    
    try {
      const persona = await PersonaController.findByDni(dni.trim());
  
      if (persona) {
        const { id, ...persona} = req.body;
        await PersonaController.update(persona._id, req.body);
        res.status(200).json("Usuario editado y guardado en DB");
      } else {
        await PersonaController.create(req.body);
        res.status(200).json("Usuario Creado y guardado en DB");
      }
    } catch (error) {
      console.log(error)
      res.status(400).json(error);
    }
  });
  
  
/* app.put('/editar', async(req, res) => {
    const { id, ...persona } = req.body;
    await PersonaController.update(id, persona);
    res.json("Usuario editado y guardado en BD");
});
 */
app.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await PersonaController.delete(id);
    res.json("Usuario eliminado de DB");
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando por el Puerto: ${PORT}`);
});







