const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const commerceType = sequelize.define('commerce_type', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    icon:{
        type: DataTypes.STRING,
        allowNull: true
    },
    color:{
        type:DataTypes.STRING,
        defaultValue: 'FADC63'
    },
    fontColor:{
        type:DataTypes.STRING,
        defaultValue: '222222'
    }
})

module.exports = commerceType;