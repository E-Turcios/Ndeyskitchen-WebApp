const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/');

router.post('/', orderController.createOrder);

module.exports = router;
