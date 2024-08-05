// Importando modulos a usar
const express = require('express');
const cors = require('cors');
const sequelize = require('./database/conexion');
const {createUserTypes,createCommerceTypes,createSuperAdmin, createCommerce } = require("./helpScripts")

// Creando las variables intermediarias
const app = express();
const PORT = 4090;

// Gestionando middlewares
app.use(express.json());
app.use(cors());


// Importando los modelos
require('./models/User/user');
require('./models/User/userType');

require('./models/Commerce/commerce');
require('./models/Commerce/commerceType');
require('./models/Commerce/commerce_category');

require('./models/other/favorites');

// require('./models/Products/product_category');
require('./models/Products/product');

require('./models/other/direction');

require('./models/Orders/orders');
require('./models/Orders/orders_details');

// Importando las rutas
const userRoutes = require('./routes/Login/userRoutes');
const commerceRoutes = require('./routes/commerce/commerceRoutes');
const commerceType = require('./routes/commerce/commerceType');
const authenticationRoutes = require('./routes/Login/authRoute');
const orders_details_routes = require('./routes/orders/orders_details_router');
const orders_routes = require('./routes/orders/orders_routes');
const directions_routes = require('./routes/other/directions_routes');
const favorites_routes = require('./routes/other/favorites_routes');
const product_category_routes = require('./routes/products/product_category_routes');
const product_routes = require('./routes/products/product_routes');

// Creando los endPoints
app.use('/api/user',userRoutes);
app.use('/api/commerce', commerceRoutes);
app.use('/api/commerceType', commerceType);
app.use('/api/auth',authenticationRoutes);
app.use('/api/orders_details',orders_details_routes);
app.use('/api/orders', orders_routes);
app.use('/api/directions',directions_routes);
app.use('/api/favorites',favorites_routes);
app.use('/api/product_category', product_category_routes);
app.use('/api/product_routes', product_routes);

//  Sincronizando Sequelize
sequelize.sync({force:true})
.then(()=>{
    console.log('Database Connection was successfully'); 
    // servidor escuchando
    
    // insertando datos para el force
    createUserTypes();
    createCommerceTypes();
    createSuperAdmin();
    createCommerce();
    
    app.listen(PORT,() => {
        console.log(`Server listen on port http://localhost:${PORT}`)
    });
}).catch(err =>{
    console.error('Database Connection had problems', err);
});
