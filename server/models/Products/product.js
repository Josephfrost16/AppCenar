const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const category = require("../Commerce/commerce_category");

const products = sequelize.define('products', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    category_id:{
        type:DataTypes.INTEGER,
        references: {
            model: category,
            key: 'id'
        }
    }
})


category.hasMany(products, {foreignKey: 'category_id'});
products.belongsTo(category, {foreignKey: 'category_id'});

module.exports = products;

