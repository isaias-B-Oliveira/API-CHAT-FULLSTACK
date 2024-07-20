const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chat", "isaias", "91827364", {
    host: "172.18.44.28", // ou 'localhost'
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("coneção com sql_serve bem sucedida");
    })
    .catch((err) => {
        console.log("sem conexão com db", err);
    });

module.exports = sequelize;
