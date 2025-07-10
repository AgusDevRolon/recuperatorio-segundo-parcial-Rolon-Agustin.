import { Sequelize } from "sequelize";
import 'dotenv/config';

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("La conexion con la base de datos fue establecida correctamente.");
    } catch (error){
        console.error("No se pudo conectar a la Base de Datos:", error);
    }
};

export {sequelize, testConnection};