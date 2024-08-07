const controller = require('../../controllers/Login/userControllers');
const router = require('express').Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.get('/confirm/:token',controller.confirm);

router.post('/',controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);


module.exports = router;