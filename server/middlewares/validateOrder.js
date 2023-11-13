const Item = require('../database/models/itemModel');
const { WRONG_PARAMETERS } = require('../messages');

async function validateOrder(req, res, next) {
  const { information } = req.body;
  const subtotals = [];

  for (const item of information.items) {
    try {
      const foundItem = await Item.findOne({
        _id: item.id,
        [`size.${item.size}`]: { $exists: true },
      });

      if (!foundItem)
        return res.status(400).json({ Message: WRONG_PARAMETERS });

      subtotals.push(
        parseInt(foundItem.size.get(item.size)) * parseInt(item.quantity)
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (subtotals.length === 0)
    return res.status(400).json({ Message: WRONG_PARAMETERS });

  const total = subtotals.reduce(
    (accumulator, current) => accumulator + current,
    0
  );

  if (total === information.total) {
    req.match = true;
    next();
  }
}

module.exports = { validateOrder };
