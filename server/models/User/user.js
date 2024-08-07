const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');
const userType = require("./userType");


const User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    }, 
    lastName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    accountType:{
        type:DataTypes.INTEGER,
        references: {
            model: userType,
            key: 'id'
        }
    },
    photo:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
    },
    email:{
        type:DataTypes.STRING,
        unique: true,
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
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.INTEGER,
        defaultValue: 0
    },
    // Check this out:
    delivery_state:{
        type: DataTypes.INTEGER,
        defaultValue:null,
        allowNull:true
    },
    resetToken:{
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    }
});

userType.hasMany(User, {foreignKey: 'accountType'});
User.belongsTo(userType, {foreignKey: 'accountType'});

module.exports = User;
