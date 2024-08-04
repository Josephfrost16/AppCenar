const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const commerceCategory = require("../Commerce/commerce_category");

const product_category = sequelize.define('product_category', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    commerce_category_id:{
        type: DataTypes.INTEGER,
        references: {
            model: commerceCategory,
            key: 'id'
        },
        allowNull: false
    }
})

commerceCategory.hasMany(product_category,{foreignKey: 'commerce_category_id'});

product_category.belongsTo(commerceCategory,{foreignKey: 'commerce_category_id'});

module.exports = product_category;

