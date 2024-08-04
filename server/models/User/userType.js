const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const userType = sequelize.define('user_type', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = userType;