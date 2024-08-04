const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const product = require("../Products/product");
const orders = require("./orders");

const order_details = sequelize.define('order_details', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    product_id:{
        type:DataTypes.INTEGER,
        references: {
            model: product,
            key: 'id'
        }
    },
    orders_id:{
        type:DataTypes.INTEGER,
        references: {
            model: orders,
            key: 'id'
        }
    }
})

orders.hasMany(order_details, {foreignKey: 'orders_id'});
product.hasMany(order_details, {foreignKey: 'product_id'});

order_details.belongsTo(orders, {foreignKey: 'orders_id'});
order_details.belongsTo(product, {foreignKey: 'product_id'});


module.exports = order_details;

