const controller = require('../../controllers/other/directions_controller');
const router = require('express').Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/user/:id', controller.getByUser);

router.post('/',controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;