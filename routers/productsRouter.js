const router = require('express').Router();
const productsController = require('../controllers/productsControllers');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.createProduct);

module.exports = router;
