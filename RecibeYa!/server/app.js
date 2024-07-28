// Importando modulos a usar
const express = require('express');
const cors = require('cors');
const sequelize = require('./database/conexion');
const {createUserTypes,createCommerceTypes,createSuperAdmin } = require("./helpScripts")

// Creando las variables intermediarias
const app = express();
const PORT = 4090;

// Gestionando middlewares
app.use(express.json());
app.use(cors());


// Importando los modelos
require('./models/Login/user');
require('./models/Login/userType');
require('./models/Login/commerce');
require('./models/Login/commerceType');


// Importando las rutas
const userRoutes = require('./routes/Login/userRoutes');
const commerceRoutes = require('./routes/Login/commerceRoutes');
const commerceType = require('./routes/Login/commerceType');
const authenticationRoutes = require('./routes/Login/authRoute');

// Creando los endPoints
app.use('/api/user',userRoutes);
app.use('/api/commerce', commerceRoutes);
app.use('/api/commerceType', commerceType);
app.use('/api/auth',authenticationRoutes);

//  Sincronizando Sequelize
sequelize.sync({force:true})
.then(()=>{
    console.log('Database Connection was successfully'); 
    // servidor escuchando
    
    // insertando datos para el force
    createUserTypes();
    createCommerceTypes();
    createSuperAdmin();
    
    app.listen(PORT,() => {
        console.log(`Server listen on port http://localhost:${PORT}`)
    });
}).catch(err =>{
    console.error('Database Connection had problems', err);
});
