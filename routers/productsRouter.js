const router = require('express').Router();
const productsController = require('../controllers/productsControllers');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProductById);

module.exports = router;
