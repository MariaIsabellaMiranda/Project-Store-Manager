const router = require('express').Router();
const rescue = require('../middlewares/rescue');
const salesControllers = require('../controllers/salesControllers');

router.post('/', rescue(salesControllers.createSales));

router.get('/', rescue(salesControllers.getAllSales));

router.get('/:id', rescue(salesControllers.getSalesId));

router.delete('/:id', rescue(salesControllers.deleteSales));

router.put('/:id', rescue(salesControllers.updateSales));

module.exports = router;
