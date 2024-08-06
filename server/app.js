// Importando modulos a usar
const express = require("express");
const cors = require("cors");
const sequelize = require("./database/conexion");
const {
  createUserTypes,
  createCommerceTypes,
  createSuperAdmin,
  createCommerce,
} = require("./helpScripts");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Creando las variables intermediarias
const app = express();
const PORT = 4090;

// Gestionando middlewares
app.use(express.json());
app.use(cors());

// Importando los modelos
require("./models/User/user");
require("./models/User/userType");

require("./models/Commerce/commerce");
require("./models/Commerce/commerceType");
require("./models/Commerce/commerce_category");

require("./models/other/favorites");

require("./models/Products/product_category");
require("./models/Products/product");

require("./models/other/direction");

require("./models/Orders/orders");
require("./models/Orders/orders_details");

// Importando las rutas
const userRoutes = require("./routes/Login/userRoutes");
const commerceRoutes = require("./routes/commerce/commerceRoutes");
const commerceType = require("./routes/commerce/commerceType");
const authenticationRoutes = require("./routes/Login/authRoute");

// Creando los endPoints
app.use("/api/user", userRoutes);
app.use("/api/commerce", commerceRoutes);
app.use("/api/commerceType", commerceType);
app.use("/api/auth", authenticationRoutes);

//Confg Multer
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ imgStorage });

app.post('/upload-photo', upload.single('photo'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  });

//  Sincronizando Sequelize
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database Connection was successfully");
    // servidor escuchando

    // insertando datos para el force
    createUserTypes();
    createCommerceTypes();
    createSuperAdmin();
    createCommerce();

    app.listen(PORT, () => {
      console.log(`Server listen on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection had problems", err);
  });
