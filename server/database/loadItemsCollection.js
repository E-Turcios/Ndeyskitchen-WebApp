const Item = require('../database/models/itemModel');
const DBConnection = require('./DBConnect');
const chalk = require('chalk');

const image = 'img1.jpeg';

const itemsData = [
  {
    name: 'CHOCOLATE CAKE',
    category: 'Sweet',
    components: 'Chocolate filling, vanilla icing',
    price: '20.99',
    image: image,
    alt: 'image',
  },

  {
    name: 'WRAP',
    category: 'Savory',
    components: 'Tomato sauce, cheese',
    price: '10.99',
    image: image,
    alt: 'image',
  },

  {
    name: 'PUMPKIN CAKE',
    category: 'Sweet',
    components: 'Chocolate filling, chocolate icing',
    price: '15.99',
    image: image,
    alt: 'image',
  },

  {
    name: 'CHOCOLATE CAKE',
    category: 'Sweet',
    components: 'Vanilla filling, vanilla icing',
    price: 25.99,
    image: image,
    alt: 'image',
  },

  {
    name: 'VANILLA CAKE',
    category: 'Sweet',
    components: 'Vanilla filling, vanilla icing',
    price: '25.00',
    image: image,
    alt: 'image',
  },

  {
    name: 'PIZZA',
    category: 'Savory',
    components: 'Tomato sauce, cheese',
    price: '20.99',
    image: image,
    alt: 'image',
  },

  {
    name: 'CHICKEN WINGS',
    category: 'Savory',
    components: 'BBQ sauce',
    price: '10.99',
    image: image,
    alt: 'image',
  },
];

async function loadItemsCollection() {
  try {
    await DBConnection;

    const result = await Item.insertMany(itemsData);

    if (result) console.log(chalk.yellow('Items data loaded successfully'));
  } catch (err) {
    console.error(`Error inserting documents: ${err.message}`);
  }
}

loadItemsCollection();
