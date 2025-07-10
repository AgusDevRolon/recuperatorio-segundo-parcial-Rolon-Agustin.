import ProgrammingLanguage from "../models/language.model.js";

const validateLanguageData = (data, isUpdate = false) => {
    const errors = [];
    if (data.name !== undefined) {
        if (typeof data.name !== 'string' || data.name.trim() === '') {
            errors.push('El campo "name" debe ser una cadena de texto no vacía.');
        }
    } else if (!isUpdate) { 
        errors.push('El campo "name" es obligatorio.');
    }
    if (data.paradigm !== undefined) {
        if (typeof data.paradigm !== 'string' || data.paradigm.trim() === '') {
            errors.push('El campo "paradigm" debe ser una cadena de texto no vacía.');
        }
    } else if (!isUpdate) { 
        errors.push('El campo "paradigm" es obligatorio.');
    }
    if (data.release_year !== undefined && (typeof data.release_year !== 'number' || !Number.isInteger(data.release_year))) {
        errors.push('El campo "release_year" debe ser un número entero válido.');
    }

    return errors;
};

const getAllLanguages = async (req, res) => {
    try {
        const languages = await ProgrammingLanguage.findAll();
        res.status(200).json(languages);
    } catch (error) {
        console.error("Error al obtener a los Lenguajes:", error);
        res.status(500).json({message: "Error interno del servidor al obtener los lenguajes.", error: error.message});
    }
};

const getLanguagesById = async (req, res) => {
    try{
        const {id} = req.params;
        const language = await ProgrammingLanguage.findByPk(id);
            if (!language){
                return res.status(404).json({ message: `El lenguaje con ID ${id} no encontrado.` });
            }
            res.status(200).json(language);
    } catch (error) {
            console.error(`Error al obtener el language con ID ${req.params.id}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al obtener los lenguajes por ID.', error: error.message});
    }
}

const createLanguage = async (req, res) => {
    try{
        const { name, paradigm, release_year } = req.body;

        const validationErrors = validateLanguageData(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ message: 'Errores de validación:', errors: validationErrors });
        }

        const existingLanguage = await ProgrammingLanguage.findOne({ where: { name: name } });
        if (existingLanguage) {
            return res.status(400).json({ message: `Ya existe un lenguaje de programación con el nombre "${name}".` });
        }

        const newLanguage = await ProgrammingLanguage.create({ name, paradigm, release_year });

        res.status(201).json(newLanguage);

    } catch (error) {
        console.error("Error al crear el lenguaje:", error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Error de validación de datos.', errors });
        }
        res.status(500).json({ message: 'Error interno del servidor al crear el lenguaje.', error: error.message });
    }
};

const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, paradigm, release_year } = req.body;
        const language = await ProgrammingLanguage.findByPk(id);
        if (!language) {
            return res.status(404).json({ message: `Lenguaje con ID ${id} no encontrado.` });
        }
        const validationErrors = validateLanguageData(req.body, true); 
        if (validationErrors.length > 0) {
            return res.status(400).json({ message: 'Errores de validación:', errors: validationErrors });
        }
        if (name !== undefined && name !== language.name) { 
            const existingLanguageWithName = await ProgrammingLanguage.findOne({ where: { name: name } });
            if (existingLanguageWithName) {
                return res.status(400).json({ message: `Ya existe otro lenguaje con el nombre "${name}".` });
            }
        }

        await language.update({ name, paradigm, release_year }); 
        res.status(200).json(language);

    } catch (error) {
        console.error(`Error al actualizar el lenguaje con ID ${req.params.id}:`, error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Error de validación de datos.', errors });
        }
        res.status(500).json({ message: 'Error interno del servidor al actualizar el lenguaje.', error: error.message });
    }
};
const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params; 
        const language = await ProgrammingLanguage.findByPk(id);
        if (!language) {
            return res.status(404).json({ message: `Lenguaje con ID ${id} no encontrado.` });
        }

        await language.destroy(); 
        res.status(204).send();

    } catch (error) {
        console.error(`Error al eliminar el lenguaje con ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el lenguaje.', error: error.message });
    }
};

export {
    getAllLanguages,
    getLanguagesById,
    createLanguage,
    updateLanguage,
    deleteLanguage
};

