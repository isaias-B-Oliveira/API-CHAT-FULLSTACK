const { Sequelize, STRING } = require("sequelize");
const db = require("./db");

const Usuario = db.define("usuarios", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

//criar a tabela no banco de dados
//Usuario.sync();

module.exports = Usuario;
