const controller = require('../../controllers/Login/authController');
const router = require('express').Router();


router.post('/login',controller.generateToken);

module.exports = router;