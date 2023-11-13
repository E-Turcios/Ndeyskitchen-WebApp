const Order = require('../database/models/orderModel');
const Counter = require('../database/models/counterModel');
const { sendEmail } = require('../sendEmail');

const {
  ORDER_VALIDATION_FAILED,
  ORDER_PLACED,
  ORDER_COULD_NOT_BE_PLACED,
} = require('../messages');

async function createOrder(req, res) {
  const { information } = req.body;

  if (!req.match)
    return res.status(400).json({ Message: ORDER_VALIDATION_FAILED });

  console.log(req.match);

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: 'orderNumberCounter' },
      { $inc: { value: 1 } },
      { upsert: true, new: true }
    );

    const orderNumber = counter.value.toString().padStart(5, '0');

    const order = await Order.create({
      orderNumber: orderNumber,
      firstName: information.firstName,
      lastName: information.lastName,
      email: information.email,
      number: information.number,
      residence: information.residence,
      total: information.total,
      service: information.service,
      paymentMethod: information.paymentMethod,
      nonCakesDate: information.datesAndTimes.nonCake.selectedDate,
      nonCakesTime: information.datesAndTimes.nonCake.selectedTime,
      cakesDate: information.datesAndTimes.cake.selectedDate,
      cakesTime: information.datesAndTimes.cake.selectedTime,
      items: information.items,
    });

    if (!order)
      return res.status(400).json({ Message: ORDER_COULD_NOT_BE_PLACED });

    return res.status(200).json({ Message: ORDER_PLACED });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err });
  }
}

module.exports = { createOrder };
