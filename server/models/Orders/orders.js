const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const user = require("../User/user");
const direction = require("../other/direction");

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
    direction_id:{
        type:DataTypes.INTEGER,
        references: {
            model: direction,
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

// Checar esta relacion:
direction.hasOne(orders,{foreignKey: 'direction_id'});

orders.belongsTo(user, {foreignKey: 'user_id'});
orders.belongsTo(direction, {foreignKey: 'direction_id'});

module.exports = orders;

