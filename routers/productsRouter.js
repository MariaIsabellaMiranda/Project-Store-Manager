const router = require('express').Router();
const rescue = require('../middlewares/rescue');
const productsController = require('../controllers/productsControllers');

router.delete('/search', rescue(productsController.getProductsSearch));
                                
router.get('/', rescue(productsController.getAllProducts));

router.get('/:id', rescue(productsController.getProductById));

router.post('/', rescue(productsController.createProduct));

router.put('/:id', rescue(productsController.updateProductById));

router.delete('/:id', rescue(productsController.deleteProducts));


module.exports = router;
