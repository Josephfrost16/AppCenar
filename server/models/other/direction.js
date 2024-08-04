const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const user = require("../User/user");

const direction = sequelize.define('directions', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id'
        },
        allowNull: false
    }
})

user.hasMany(direction,{foreignKey: 'user_id'});

direction.belongsTo(user,{foreignKey: 'user_id'});

module.exports = direction;

