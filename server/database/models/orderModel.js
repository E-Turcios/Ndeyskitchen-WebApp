const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 1 },
});

const Counter = mongoose.model('Counter', CounterSchema);

const OrderSchema = new Schema(
  {
    orderNumber: { type: Number, required: false, maxlength: 10 },
    userId: { type: String, maxlength: 50 },
    firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    number: { type: String, required: true, maxlength: 20 },
    residence: { type: String, required: true, maxlength: 50 },
    total: { type: String, required: true, maxlength: 10 },
    service: { type: String, required: true, maxlength: 10 },
    paymentMethod: { type: String, required: true, maxlength: 15 },
    nonCakesDate: { type: String, required: true, maxlength: 11 },
    nonCakesTime: { type: String, required: true, maxlength: 14 },
    cakesDate: { type: String, required: true, maxlength: 11 },
    cakesTime: { type: String, required: true, maxlength: 14 },
    items: { type: Array, required: true },
  },
  { timestamps: true }
);

OrderSchema.pre('save', async function (next) {
  try {
    if (!this.orderNumber || this.orderNumber === 0) {
      const counter = await Counter.findOneAndUpdate(
        { name: 'orderNumberCounter' },
        { $inc: { value: 1 } },
        { upsert: true, new: true }
      );

      this.orderNumber = counter.value;
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Order', OrderSchema);
