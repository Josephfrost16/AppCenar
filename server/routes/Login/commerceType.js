const controller = require('../../controllers/Login/commerceController');
const router = require('express').Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post('/',controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;