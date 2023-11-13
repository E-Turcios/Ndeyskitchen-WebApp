const Item = require('../database/models/itemModel');
const mongoose = require('mongoose');
const chalk = require('chalk');

const image = {
  biscoffCake: 'items/biscoff-cake.jpg',
  breakFastBox: 'items/breakfast-box.jpg',
  chocolateOverload: 'items/chocolate-overload.jpg',
  cookies: 'items/cookies.jpg',
  fruitPlatter: 'items/fruit-platter.jpg',
  snacks: 'items/snacks.jpg',
  weddingCake: 'items/wedding-cake.jpg',
  purpleFloral: 'items/purple-floral-cake.jpg',
  pinkFloral: 'items/pink-floral-cake.jpg',
};

const filter = {
  ALL: 'All',
  CAKES: 'Cakes',
  CUPCAKES: 'Cupcakes',
  COOKIES: 'Cookies',
  FRUIT_PLATTER: 'Fruit Platter',
  DESSERT_CUPS: 'Dessert Cups',
  BREAK_FAST_BOX: 'Breakfast Box',
  SNACKS: 'Snacks',
};

const itemsData = [
  {
    name: '2-Tier Wedding Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    components: 'Vanilla + Red Velvet Tiers, Strawberry + Cream Cheese Filling',
    price: 9000,
    size: {
      Large: '9000',
    },
    image: image.weddingCake,
    alt: '2-Tier Wedding Cake',
  },

  {
    name: 'Chocolate Overload Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    components: 'Chocolate Ganache, White Chocolate Buttercream',
    price: 6500,
    size: {
      Medium: '6500',
      Large: '7000',
    },
    image: image.chocolateOverload,
    alt: 'Chocolate Overload Cake',
  },

  {
    name: 'Fruit Platter',
    category: 'Sweet',
    filter: filter.FRUIT_PLATTER,
    components: 'Watermelon, Pineapple, Orange, Mandarine, Grapes',
    price: 2500,
    size: {
      '1Pc': '2500',
    },
    image: image.fruitPlatter,
    alt: 'Fruit Platter',
  },

  {
    name: '12 Chocolate Cupcakes',
    category: 'Sweet',
    filter: filter.CUPCAKES,
    components: 'White Chocolate Buttercream',
    price: 2000,
    size: {
      '12Pcs': '2000',
    },
    image: image.pinkFloral,
    alt: '12 Chocolate Cupcakes',
  },

  {
    name: 'Sugar Cookies',
    category: 'Sweet',
    filter: filter.COOKIES,
    components: '25 Sugar Cookies',
    price: 2500,
    size: {
      '25Pcs': '2500',
    },
    image: image.cookies,
    alt: 'Sugar Cookies',
  },

  {
    name: 'Biscoff Drip Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    components:
      'Vanilla Cake, White Chocolate Biscoff Buttercream, Biscoff Spread',
    price: 5000,
    size: {
      Medium: '5000',
    },
    image: image.biscoffCake,
    alt: 'Biscoff Drip Cake',
  },

  {
    name: 'Cheesecake Dessert Cups',
    category: 'Sweet',
    filter: filter.DESSERT_CUPS,
    components:
      'Chocolate Mousse, Oreo Cream, Kinder Bueno/Ferrero Rocher, Biscoff Cream',
    price: 2500,
    size: {
      '12Pcs': '2500',
    },
    image: image.purpleFloral,
    alt: 'Cheesecake Dessert Cups',
  },

  {
    name: 'Finger Licking Snacks',
    category: 'Savory',
    filter: filter.SNACKS,
    components:
      '(5 Each) Mini Burgers, Mini Pizza, Chicken Batbout, Hotdogs, Beef Wraps',
    price: 3000,
    size: {
      '25Pcs': '3000',
    },
    image: image.snacks,
    alt: 'Finger Licking Snacks',
  },

  {
    name: 'Breakfast Box',
    category: 'Savory',
    filter: filter.BREAK_FAST_BOX,
    components:
      'Wings, Spaghettis, Sardine Sandwich, Meat Pie, Waffles, Yogurt, Fruits (Varies Weekly)',
    price: 1500,
    size: {
      '1Box': '1500',
    },
    image: image.breakFastBox,
    alt: 'Breakfast Box',
  },

  {
    name: 'Purple Floral Design Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    components: 'Flavor of Choice',
    price: 5000,
    size: {
      Medium: '5000',
    },
    image: image.purpleFloral,
    alt: 'Purple Floral Design Cake',
  },

  {
    name: 'Pink Floral Chocolate Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    components: 'Chocolate icing',
    price: 5000,
    size: {
      Medium: '5000',
    },
    image: image.pinkFloral,
    alt: 'Pink Floral Chocolate Cake',
  },
];

mongoose
  .connect(
    'mongodb+srv://boundy99:MyDatabase@cluster0.dllurye.mongodb.net/Ndeyskitchen'
  )
  .then(() => {
    console.log(chalk.cyan('Database Connection Established'));
  })
  .catch(err => console.log(err));

async function loadItemsCollection() {
  try {
    const result = await Item.insertMany(itemsData);

    if (result) console.log(chalk.yellow('Items data loaded successfully'));
  } catch (err) {
    console.error(`Error inserting documents: ${err.message}`);
  } finally {
    mongoose.connection.close();
  }
}

loadItemsCollection();
