const Order = require('../database/models/orderModel');
const Counter = require('../database/models/counterModel');
const { itemOptions } = require('../script/itemOptions');
const { sendEmail } = require('../sendEmail');

const { ORDER_VALIDATION_FAILED, ORDER_PLACED } = require('../messages');

async function createOrder(req, res) {
  const { information } = req.body;

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: 'orderNumberCounter' },
      { $inc: { value: 1 } },
      { upsert: true, new: true }
    );

    const order = await Order.create({
      orderNumber: counter.value.toString().padStart(5, '0'),
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

    if (order) return res.status(200).json({ Message: ORDER_PLACED });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createOrder };
