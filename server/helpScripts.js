const sequelize = require('./database/conexion');
const UserType = require('./models/User/userType');
const commerceType = require('./models/Commerce/commerceType');
const user = require('./models/User/user');
const commerce = require('./models/Commerce/commerce')

const Encryption = require('./helpers/Encryption');

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
            {type: 'Restaurante', icon:'https://png.pngtree.com/png-clipart/20230928/original/pngtree-burger-png-images-png-image_13164941.png'},
            {type: 'Mercado', icon: 'https://png.pngtree.com/png-vector/20240515/ourmid/pngtree-grocery-basket-with-vegetables-shopping-in-the-store-png-image_12468689.png', color:'9EDFEE'},
            {type: 'Bebidas', icon: 'https://png.pngtree.com/png-clipart/20240118/original/pngtree-enjoy-drinks-png-image_14131182.png'},
            {type: 'Postres', icon: 'https://png.pngtree.com/png-clipart/20230417/original/pngtree-summer-strawberry-desserts-look-good-and-real-png-image_9059040.png',color:'9EDFEE'},
            {type: 'Tiendas', icon: 'https://static.vecteezy.com/system/resources/thumbnails/017/208/089/small/white-paper-shopping-bag-isolated-with-clipping-path-for-mockup-png.png', color:'F2F1F3'},
            {type: 'Farmacia', icon: 'https://png.pngtree.com/png-clipart/20230703/original/pngtree-3d-first-aid-box-without-background-png-image_9248019.png', color:'F2F1F3'},        
          ]);
    } catch (error) {
        console.error('Error seeding ecommerce data:', error);
    }
}

const createSuperAdmin = async () =>{
    try {
        const EncryptedPassword = await Encryption.encrypt("admin123");

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
                password:EncryptedPassword
              }
          );
    } catch (error) {
        console.error('Error seeding User data:', error);
    }
}

const createCommerce = async()=>{
    try {
        const EncryptedPassword = await Encryption.encrypt("pruebaComercio");

        await commerce.create(
            {
            name: 'MacDonalds',
            commerceTypeId: 1,
            logo:"https://media.designrush.com/inspiration_images/134933/conversions/_1511456189_555_McDonald's-preview.jpg",
            email:"comercio1@gmail.com",
            country:"Republica Dominicana",
            phone:"8095849087",
            password:EncryptedPassword,
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