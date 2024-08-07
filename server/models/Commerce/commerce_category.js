const sequelize = require("../../database/conexion");
const {DataTypes} = require('sequelize');

const commerce = require("./commerce");


const commerce_category = sequelize.define('commerce_category', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    commerce_id:{
        type: DataTypes.INTEGER,
        references:{
            model: commerce,
            key:"id",
        }, 
    }
})

commerce.hasMany(commerce_category,{foreignKey:'commerce_id',onDelete:'CASCADE',onUpdate:'CASCADE'});
commerce_category.belongsTo(commerce,{foreignKey:'commerce_id',onDelete:'CASCADE',onUpdate:'CASCADE'});

module.exports = commerce_category;

