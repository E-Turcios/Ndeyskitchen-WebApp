const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrder, validateUser } = require('../middlewares');

router.get('/');

router.post('/', validateOrder, orderController.createOrder);

router.post('/get-user-orders', validateUser, orderController.getUserOrders);

module.exports = router;
