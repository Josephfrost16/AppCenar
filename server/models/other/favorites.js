const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');
const user = require("../User/user");
const commerce = require("../Commerce/commerce");


const favorites = sequelize.define('favorites', {
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
    commerce_id:{
        type:DataTypes.INTEGER,
        references: {
            model: commerce,
            key: 'id'
        }
    }
})

user.hasMany(favorites, {foreignKey: 'user_id'});
commerce.hasMany(favorites, {foreignKey: 'commerce_id'});

favorites.belongsTo(user, {foreignKey: 'user_id'});
favorites.belongsTo(commerce, {foreignKey: 'commerce_id'});

module.exports = favorites;
