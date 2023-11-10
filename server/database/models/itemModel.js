const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    filter: { type: String, required: true },
    components: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);
