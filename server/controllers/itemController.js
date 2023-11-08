const Item = require('../database/models/itemModel');
const { getDatesAndTimes } = require('../script/getDatesAndTimes');
const { itemOptions } = require('../script/itemOptions');

const { ITEMS_NOT_FOUND } = require('../messages');

async function getItems(req, res) {
  const items = await Item.find();

  if (!items) return res.status(404).json({ Message: ITEMS_NOT_FOUND });

  return res.status(200).json(items);
}

async function getDatesTimes(req, res) {
  const { item } = req.body;

  if (!item.filter) return res.status(404).json({ Message: ITEMS_NOT_FOUND });

  const { maximumDate, minimumDate, minimumTime, maximumTime } =
    getDatesAndTimes({ item });

  return res
    .status(200)
    .json({ maximumDate, minimumDate, minimumTime, maximumTime });
}

async function getItemsOptions(req, res) {
  if (!itemOptions) return res.status(404).json({ Message: ITEMS_NOT_FOUND });

  return res.status(200).json(itemOptions);
}

module.exports = { getItems, getDatesTimes, getItemsOptions };
