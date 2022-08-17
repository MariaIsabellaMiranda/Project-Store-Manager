const router = require('express').Router();
const salesControllers = require('../controllers/salesControllers');

router.post('/', salesControllers.createSales);

router.get('/', salesControllers.getAllSales);

router.get('/:id', salesControllers.getSalesId);

router.delete('/:id', salesControllers.deleteSales);

router.put('/:id', salesControllers.updateSales);

module.exports = router;
