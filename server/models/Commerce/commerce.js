const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const commerceType = require('./commerceType');

const commerce = sequelize.define('commerce',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    }, 
    commerceTypeId:{
        type:DataTypes.INTEGER,
        references: {
            model: commerceType,
            key: 'id'
        }
    },
    logo:{
        type:DataTypes.STRING,
        allowNull:true
    },
    banner:{
        type:DataTypes.TEXT,
        allowNull:true
    }
    ,
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    zip:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.INTEGER,
        defaultValue: 0
    }
});

commerceType.hasMany(commerce, {foreignKey: 'commerceTypeId'});
commerce.belongsTo(commerceType, {foreignKey: 'commerceTypeId'});

module.exports = commerce;