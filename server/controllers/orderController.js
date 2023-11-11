const Order = require('../database/models/orderModel');
const { itemOptions } = require('../script/itemOptions');
const { sendEmail } = require('../sendEmail');

const { ORDER_VALIDATION_FAILED, ORDER_PLACED } = require('../messages');

async function createOrder(req, res) {
  const {
    firstName,
    lastName,
    email,
    number,
    residence,
    service,
    paymentMethod,
    total,
    cart,
    datesAndTimes,
  } = req.body;

  try {
    const order = await Order.create({
      firstName,
      lastName,
      email,
      number,
      residence,
      total,
      service,
      paymentMethod,
      nonCakesDate: datesAndTimes.nonCake.selectedDate,
      nonCakesTime: datesAndTimes.nonCake.selectedTime,
      cakesDate: datesAndTimes.cake.selectedDate,
      cakesTime: datesAndTimes.cake.selectedTime,
      items: cart,
    });

    if (order) return res.status(200).json({ Message: ORDER_PLACED });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { createOrder };
