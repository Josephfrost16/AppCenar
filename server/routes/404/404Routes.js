const controller = require('../../controllers/other/404_controller');

const router = require('express').Router();

router.get('/',controller.get404);

module.exports = router;
