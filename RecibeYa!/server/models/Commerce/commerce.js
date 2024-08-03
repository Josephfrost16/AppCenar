const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const commerceType = require('./commerceType');
const category = require('./commerce_category');

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
    email:{
        type:DataTypes.STRING,
        allowNull:false
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
    category_id:{
        type: DataTypes.INTEGER,
        references: {
            model: category,
            key: 'id'
        },
        allowNull: false
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

category.hasMany(commerce,{foreignKey:'category_id'});

commerce.belongsTo(commerceType, {foreignKey: 'commerceTypeId'});
commerce.belongsTo(category, {foreignKey: 'category_id'});

module.exports = commerce;