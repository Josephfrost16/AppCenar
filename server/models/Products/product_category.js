// const sequelize = require("../../database/conexion");
// const {DataTypes} = require('sequelize');

// const commerceCategory = require("../Commerce/commerce_category");
// const products = require("./product");

// const product_category = sequelize.define('product_category', {
//     id:{
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement:true
//     },
//     commerce_category_id:{
//         type: DataTypes.INTEGER,
//         references: {
//             model: commerceCategory,
//             key: 'id'
//         },
//         allowNull: false
//     },
//     product_id:{
//         type: DataTypes.INTEGER,
//         references: {
//             model: products,
//             key: 'id'
//         },
//         allowNull: false
//     }
// })

// commerceCategory.hasMany(product_category,{foreignKey: 'commerce_category_id'});
// product_category.belongsTo(commerceCategory,{foreignKey: 'commerce_category_id'});

// products.hasMany(product_category, {foreignKey:'product_id'});
// product_category.belongsTo(products,{foreignKey: 'product_id'})

// MODELO DESACTIVADO.

