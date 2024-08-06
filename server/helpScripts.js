const sequelize = require('./database/conexion');
const UserType = require('./models/User/userType');
const commerceType = require('./models/Commerce/commerceType');
const user = require('./models/User/user');
const commerce = require('./models/Commerce/commerce')

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

const createCommerce = async()=>{
    try {
        await commerce.create(
            {
            name: 'MacDonalds',
            commerceTypeId: 1,
            logo:"https://media.designrush.com/inspiration_images/134933/conversions/_1511456189_555_McDonald's-preview.jpg",
            email:"comercio1@gmail.com",
            country:"Republica Dominicana",
            phone:"8095849087",
            password:"pruebaComercio",
            zip:"01002"
            }
        );
    } catch (error) {
        console.error('Error seeding User data:', error);
    }
}

module.exports = {
    createUserTypes,
    createCommerceTypes,
    createSuperAdmin,
    createCommerce
}