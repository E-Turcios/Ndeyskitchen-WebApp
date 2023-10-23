const mongoose = require('mongoose');
const Item = require('../database/models/itemModel');

const { ITEMS_NOT_FOUND } = require('../messages');

async function getItems(req, res) {
  const items = await Item.find();

  if (!items) return res.status(404).json({ Message: ITEMS_NOT_FOUND });

  return res.status(200).json(items);
}

module.exports = { getItems };
