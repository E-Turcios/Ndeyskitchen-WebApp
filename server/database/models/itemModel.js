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
    flavor: { type: String, default: 'N/A' },
    topping: { type: String, default: 'N/A' },
    icing: { type: String, default: 'N/A' },
    size: { type: String, default: 'N/A' },
    price: { type: String, default: 'N/A' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);
