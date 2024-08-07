const controller = require('../../controllers/commerce/commerce_category_controller');
const router = require('express').Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/categories-commerce/:id', controller.getCategoryByCommerce);

router.post('/',controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;