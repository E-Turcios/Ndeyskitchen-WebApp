const Item = require('../database/models/itemModel');
const DBConnection = require('./DBConnect');
const chalk = require('chalk');

const itemsData = [
  {
    name: 'CHOCOLATE CAKE',
    category: 'Sweet',
    components: 'Chocolate filling, vanilla icing',
    price: 20.99,
    image: 'server/images/items/img1.jpeg',
    alt: 'image',
  },

  {
    name: 'PUMPKIN CAKE',
    category: 'Sweet',
    components: 'Chocolate filling, chocolate icing',
    price: 15.99,
    image: 'server/images/items/img1.jpeg',
    alt: 'image',
  },

  {
    name: 'CHOCOLATE CAKE',
    category: 'Sweet',
    components: 'Vanilla filling, vanilla icing',
    price: 25.99,
    image: 'server/images/items/img1.jpeg',
    alt: 'image',
  },

  {
    name: 'VANILLA CAKE',
    category: 'Sweet',
    components: 'Vanilla filling, vanilla icing',
    price: 25.0,
    image: 'server/images/items/img1.jpeg',
    alt: 'image',
  },

  {
    name: 'PIZZA',
    category: 'Salty',
    components: 'Tomato sauce, cheese',
    price: 20.99,
    image: 'server/images/items/img1.jpeg',
    alt: 'image',
  },

  {
    name: 'CHICKEN WINGS',
    category: 'Salty',
    components: 'BBQ sauce',
    price: 10.99,
    image: 'server/images/items/img1.jpeg',
    alt: 'image',
  },
];

async function loadItemsCollection() {
  try {
    await DBConnection;

    const result = await Item.insertMany(itemsData);

    if (result) console.log(chalk.cyan('Items data loaded successfully'));
  } catch (err) {
    console.error(`Error inserting documents: ${err.message}`);
  }
}

loadItemsCollection();
