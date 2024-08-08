const { Sequelize } = require("sequelize");

// El nombre de la base de datos debe ser recibe_ya 

// El usuario debe ser root

// La contrasena debe ser recibeya

const sequelize = new Sequelize('recibe_ya','root','Frosty16', {
    host:'localhost',
    dialect:'mysql',
    logging: false 
});

module.exports = sequelize;