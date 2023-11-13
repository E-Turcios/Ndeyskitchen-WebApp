const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrder } = require('../middlewares');

router.get('/');

router.post('/', validateOrder, orderController.createOrder);

module.exports = router;
