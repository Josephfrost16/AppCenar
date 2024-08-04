const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const commerce = require("./commerce");

const commerce_category = sequelize.define('commerce_category', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = commerce_category;

