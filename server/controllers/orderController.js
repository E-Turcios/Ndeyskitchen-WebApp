const Order = require('../database/models/orderModel');
const Counter = require('../database/models/counterModel');
const User = require('../database/models/userModel');
const { sendEmail } = require('../script/sendEmail');

const {
  ORDER_VALIDATION_FAILED,
  ORDER_PLACED,
  ORDER_COULD_NOT_BE_PLACED,
  USER_NOT_FOUND,
  ORDERS_NOT_FOUND,
} = require('../messages');

async function createOrder(req, res) {
  const { information } = req.body;

  if (!req.match)
    return res.status(400).json({ Message: ORDER_VALIDATION_FAILED });

  try {
    const user = await User.findById(information.id);

    if (user)
      await User.updateMany(
        { number: 'N/A', residence: 'N/A', countryCode: 'N/A' },
        {
          $set: {
            number: information.number,
            countryCode: information.countryCode,
            residence: information.residence,
          },
        }
      );

    const counter = await Counter.findOneAndUpdate(
      { name: 'orderNumberCounter' },
      { $inc: { value: 1 } },
      { upsert: true, new: true }
    );

    const orderNumber = counter.value.toString().padStart(5, '0');

    const order = await Order.create({
      orderNumber: orderNumber,
      userId: user ? user._id : 'N/A',
      firstName: information.firstName,
      lastName: information.lastName,
      email: information.email,
      countryCode: information.countryCode,
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

    sendEmailToUserAndAdmin(information, orderNumber);

    return res.status(200).json({ Message: ORDER_PLACED });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: err });
  }
}

async function sendEmailToUserAndAdmin(information, orderNumber) {
  const userReceiver = information.email;
  const userSubject = 'Order Placed - Confirmation Email';
  const itemsList = information.items
    .map(
      item =>
        `<tr>
       <td>${item.name}</td>
       <td style="text-align: right;">${item.quantity} x D ${item.price}</td>
       <td style="text-align: right;">D ${item.quantity * item.price}
       </td>
    </tr>`
    )
    .join('');

  const userMessage = `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
    <p style="font-size: 17px;">Order Number: #${orderNumber}</p>
      <p style="font-size: 18px;"><strong>Thank you for your order at Ndey's Kitchen!</strong></p>
      <p style="font-size: 16px;">Your order details:</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr>
            <th style="border-bottom: 1px solid #ddd;">Item</th>
            <th style="text-align: right; border-bottom: 1px solid #ddd;">Quantity x Price</th>
            <th style="text-align: right; border-bottom: 1px solid #ddd;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
      </table>
      <hr style="border: 1px solid #ddd; margin: 10px 0;">
      <p style="font-size: 16px; text-align: center;">Total: D ${information.total}</p>
      <p style="font-size: 16px;">Payment Method: ${information.paymentMethod}</p>
      <p style="font-size: 16px;">For any inquiries, please reach out to us:</p>
      <a style="font-size: 16px; margin: 0;" href="mailto:support@ndeyskicthen.com">support@ndeyskicthen.com</a>
      <p style="font-size: 16px; margin: 0;">WhatsApp: +220 794 4636</p>
      <p style="font-size: 16px;">We appreciate your business!</p>
    </div>
  `;

  const adminReceiver = `${process.env.ADMIN_EMAIL_ADDRESS}`;
  const adminSubject = 'New Order Received';
  const adminMessage = `A new order came in.`;

  sendEmail(userSubject, userMessage, userReceiver);
  sendEmail(adminSubject, adminMessage, adminReceiver);
}

async function getUserOrders(req, res) {
  if (!req.user) return res.status(404).json({ Message: USER_NOT_FOUND });

  try {
    const orders = await Order.find({ userId: req.user._id });

    if (!orders) return res.status(404).json({ Message: ORDERS_NOT_FOUND });

    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ Message: err });
  }
}

module.exports = { createOrder, getUserOrders };
