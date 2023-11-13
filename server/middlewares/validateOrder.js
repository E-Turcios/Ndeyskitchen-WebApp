const { itemOptions } = require('../script/itemOptions');
const { WRONG_PARAMETERS } = require('../messages');

function validateOrder(req, res, next) {
  const { information } = req.body;
  const subtotals = [];

  information.items.forEach(item => {
    const foundItem = itemOptions.find(
      option =>
        option.name === item.name && option.size[item.size] === item.price
    );

    if (!foundItem) return res.status(400).json({ Message: WRONG_PARAMETERS });

    subtotals.push(
      parseInt(foundItem.size[item.size]) * parseInt(item.quantity)
    );
  });

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
