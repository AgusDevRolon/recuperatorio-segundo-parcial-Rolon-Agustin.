import express from 'express';
import 'dotenv/config';


import { sequelize, testConnection } from './src/config/database.js';
import ProgrammingLanguage from './src/models/language.model.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Lenguajes de Programacion funcionando!...');
});

sequelize.sync({alter: true})
.then(() => {
    console.log("Base de Datos y Tablas fueron sincronizadas.");
    testConnection();
    app.listen(PORT, () => {
        console.log(`Server escuchando en http://localhost:${PORT}`);
    });
})
.catch(error => {
    console.error("Error en la sincronizacion de la Base de Datos.", error);
    process.exit(1);
})


