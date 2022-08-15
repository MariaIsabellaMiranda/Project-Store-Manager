const router = require('express').Router();
const salesControllers = require('../controllers/salesControllers');

router.post('/', salesControllers.createSales);

router.get('/:id', () => {});

module.exports = router;
