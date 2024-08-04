const controller = require('../../controllers/Login/authController');
const router = require('express').Router();

router.get('/', controller.getByEmail);
router.post('/login',controller.getToken);

module.exports = router;