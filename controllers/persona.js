
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

    async findByDni(dni) {
        try {
            return await Persona.findOne({dni: dni});
        }catch (error) {
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
    async update(id, persona) {
        try {
            return await Persona.findByIdAndUpdate(id, persona)
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            return await Persona.findByIdAndDelete(id);
        } catch(error) {
            throw error
        }
    }


}


module.exports = new PersonaControllers();