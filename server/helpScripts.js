const sequelize = require('./database/conexion');
const UserType = require('./models/User/userType');
const commerceType = require('./models/Commerce/commerceType');
const user = require('./models/User/user');
const commerce = require('./models/Commerce/commerce');
const commerceCategory = require('./models/Commerce/commerce_category');

const Encryption = require('./helpers/Encryption');
const products = require('./models/Products/product');

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

        await commerce.bulkCreate([
            {
                name: 'MacDonalds',
                commerceTypeId: 1,
                logo:"https://media.designrush.com/inspiration_images/134933/conversions/_1511456189_555_McDonald's-preview.jpg",
                email:"comercio1@gmail.com",
                country:"Republica Dominicana",
                direction:"La Sirena Luperon, Av. Luperon, Los Cacicazgos",
                phone:"8095849087",
                password:EncryptedPassword,
                zip:"01002",
                banner:"https://www.thedailymeal.com/img/gallery/the-reason-mcdonalds-burgers-dont-rot-is-actually-really-simple/l-intro-1681761791.jpg"
            },
            {
                name: 'Carrefour',
                commerceTypeId: 2,
                logo:"https://www.shutterstock.com/image-vector/c-icon-vector-logo-sign-600nw-2242697067.jpg",
                email:"comercio2@gmail.com",
                country:"Republica Dominicana",
                direction:"La Sirena Luperon, Av. Luperon, Los Cacicazgos",
                phone:"8095849089",
                password:EncryptedPassword,
                zip:"01002",
                banner:"https://www.downtowncenter.com.do/wp-content/uploads/2016/12/carrefour04.jpg"
            },
            {
                name: 'StarBucks',
                commerceTypeId: 3,
                logo:"https://cdn.logoworks.com/wp-content/uploads/2017/06/Untitled-2-640x360-1.png",
                email:"comercio3@gmail.com",
                country:"Republica Dominicana",
                direction:"La Sirena Luperon, Av. Luperon, Los Cacicazgos",
                phone:"8095849289",
                password:EncryptedPassword,
                zip:"01002",
                banner:"https://okdiario.com/img/2023/10/29/aprovecha-al-maximo-el-dia-internacional-del-cafe-en-starbucks-descubre-como-conseguir-un-bebida-gratis.jpg"
            },
            {
                name: 'Krespy Kreme',
                commerceTypeId: 4,
                logo:"https://logowik.com/content/uploads/images/krispy-kreme.jpg",
                email:"comercio4@gmail.com",
                country:"Republica Dominicana",
                direction:"La Sirena Luperon, Av. Luperon, Los Cacicazgos",
                phone:"8095849249",
                password:EncryptedPassword,
                zip:"01002",
                banner:"https://eldiariony.com/wp-content/uploads/sites/2/2021/09/Krispy-Kreme.jpg?w=4096" 
            },
            {
                name: 'Little Caesar',
                commerceTypeId: 1,
                logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT-DxEDNqFR-BXKwPg0Xyxrmii8jL0NaH2Sg&s",
                email:"comercio5@gmail.com",
                country:"Republica Dominicana",
                direction:"La Sirena Luperon, Av. Luperon, Los Cacicazgos",
                phone:"8095842249",
                password:EncryptedPassword,
                zip:"01002",
                banner:"https://www.datocms-assets.com/24611/1701290808-homebanner_800x385_2n1pepham.png?auto=format" 
            }

        ]);
    } catch (error) {
        console.error('Error seeding User data:', error);
    }
}

const createCommerceCategory = async () =>{
    try {
        await commerceCategory.bulkCreate([
            {name:'Nuevo', commerce_id:1},
            {name:'Individuales', commerce_id:1},
            {name:'clasicos', commerce_id:1},
            {name:'Pollos',commerce_id:1}
        ]);
    }catch(error){
        console.error('Error seeding User data:', error);
    }
}


const createProducts = async () =>{
    try{
        await products.bulkCreate([
            {
                name: 'Nuevo Combo 1',
                image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
                description: 'Un delicioso combo nuevo con hamburguesa, papas y bebida.',
                price: 499,
                category_id: 1
            },
            {
                name: 'Nuevo Combo 2',
                image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
                description: 'Combo de pollo con papas y bebida, ideal para probar algo nuevo.',
                price: 529,
                category_id: 1
            },
        
            // Comercio 1: Individuales
            {
                name: 'Hamburguesa Individual',
                image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
                description: 'Hamburguesa clásica individual con queso y pepinillos.',
                price: 199,
                category_id: 2
            },
            {
                name: 'Papas Fritas Individuales',
                image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
                description: 'Porción individual de papas fritas doradas y crujientes.',
                price: 99,
                category_id: 2
            },
        
            // Comercio 1: Clásicos
            {
                name: 'Hamburguesa Clásica',
                image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
                description: 'La clásica hamburguesa con carne de res, queso, lechuga y tomate.',
                price: 299,
                category_id: 3
            },
            {
                name: 'Combo Clásico',
                image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
                description: 'Combo clásico con hamburguesa, papas fritas y refresco.',
                price: 399,
                category_id: 3
            },
        
            // Comercio 1: Pollos
            {
                name: 'Pollo Frito Individual',
                image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
                description: 'Una pieza de pollo frito crujiente y jugoso.',
                price: 159,
                category_id: 4
            },
            {
                name: 'Combo Pollo Frito',
                image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
                description: 'Combo de pollo frito con papas y bebida.',
                price: 359,
                category_id: 4
            }
        ]);
    }catch(error){
        console.error('Error seeding User data:', error);
    }
    
}

const lorem = ``


module.exports = {
    createUserTypes,
    createCommerceTypes,
    createSuperAdmin,
    createCommerce,
    createCommerceCategory,
    createProducts
}