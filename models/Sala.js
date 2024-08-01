const { Sequelize, STRING } = require("sequelize");
const db = require("./db");

const Sala = db.define("salas", {
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
});

//criar a tabela no banco de dados
//Sala.sync();

//Apaga a tabela no banco e recria novamente
//Sala.sync({ force: true });

module.exports = Sala;
