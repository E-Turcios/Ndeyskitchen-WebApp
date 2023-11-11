const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 1 },
});

module.exports = mongoose.model('Counter', CounterSchema);
