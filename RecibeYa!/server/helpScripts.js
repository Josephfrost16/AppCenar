const sequelize = require('./database/conexion');
const UserType = require('./models/User/userType');
const commerceType = require('./models/Commerce/commerceType');
const user = require('./models/User/user');

const createUserTypes = async () =>{
    try {
        await UserType.bulkCreate([
            {type: 'Administrador' },
            {type: 'Cliente' },
            {type: 'Repartidor'}
          ]);
    } catch (error) {
        console.error('Error seeding UserType data:', error);
    }
}

const createCommerceTypes = async () =>{
    try {
        await commerceType.bulkCreate([
            { type: 'Restaurante' },
            { type: 'Farmacia' },
            {type:  'Mercado'}
          ]);
    } catch (error) {
        console.error('Error seeding ecommerce data:', error);
    }
}

const createSuperAdmin = async () =>{
    try {
        await user.create(
            {
                name:"Admin",
                lastName:"",
                accountType:1,
                photo:"",
                email:"administrador@google.com",
                country:"Republica Dominicana",
                phone:"555-555-555",
                zip:"11003",
                password:"admin123"
              }
          );
    } catch (error) {
        console.error('Error seeding User data:', error);
    }
}


module.exports = {
    createUserTypes,
    createCommerceTypes,
    createSuperAdmin 
}