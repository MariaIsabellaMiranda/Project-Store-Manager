const router = require('express').Router();
const productsController = require('../controllers/productsControllers');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

module.exports = router;
