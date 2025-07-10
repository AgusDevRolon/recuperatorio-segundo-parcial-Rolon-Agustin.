import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ProgrammingLanguage = sequelize.define('ProgrammingLanguage', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    paradigm:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    release_year:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName:'Programming_languages',
    timestamps: true,
});

export default ProgrammingLanguage;