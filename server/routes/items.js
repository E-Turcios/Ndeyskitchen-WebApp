const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);

router.get('/get-item-options', itemController.getItemsOptions);

router.post('/get-dates-and-times', itemController.getDatesTimes);
router.post('/decrypt-local-storage', itemController.decryptCartToken);

module.exports = router;
