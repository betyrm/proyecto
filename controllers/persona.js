
const Persona = require('../models/persona');

class PersonaControllers{

    constructor(){}

    async findAll() {
        try {
            return await Persona.find().lean();
        } catch (error) {
            throw error;
        }
    }

    async create(persona) {
        try {
            return await Persona.create(persona);
        } catch (error) {
            throw error;
        }
    }

}


module.exports = new PersonaControllers();