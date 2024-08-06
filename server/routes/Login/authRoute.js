const controller = require('../../controllers/Login/authController');
const router = require('express').Router();

router.get('/:id', controller.getByEmail);
router.post('/login',controller.getToken);

router.get('/reset');
router.post('/reset');
module.exports = router;