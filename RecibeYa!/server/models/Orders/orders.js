const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const user = require("../User/user");
const order_details = require("./orders_details");

const orders = sequelize.define('orders', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    },
    subtotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    state:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
})

user.hasMany(orders, {foreignKey: 'user_id'});

orders.belongsTo(user, {foreignKey: 'user_id'});

module.exports = orders;

