const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);

router.get('/get-dates-and-times', itemController.getDatesTimes);

module.exports = router;
