const Item = require('../database/models/itemModel');
const mongoose = require('mongoose');
const chalk = require('chalk');

const image = {
  alfredoShrimpPasta: 'items/alfredo-shrimp-pasta.jpg',
  barbieCake: 'items/barbie-cake.jpg',
  biscoffCake: 'items/biscoff-cake.jpg',
  breadedFriedShrimp: 'items/breaded-fried-shrimp.jpg',
  breakFastBox: 'items/breakfast-box.jpg',
  cakeSlice: 'items/cake-slice.jpg',
  chickenAfra: 'items/chicken-afra.jpg',
  chickenBatbouts: 'items/chicken-batbouts.jpg',
  chocolateOverloadCake: 'items/chocolate-overload-cake.jpg',
  cookies: 'items/cookies.jpg',
  cupcakes: 'items/cupcakes.jpg',
  darkThemedCake: 'items/dark-themed-cake.jpg',
  donuts: 'items/donuts.jpg',
  ebbeh: 'items/ebbeh.jpg',
  fingerFoodTray: 'items/finger-food-tray.jpg',
  friedChicken: 'items/fried-chicken.jpg',
  fruitPlatter: 'items/fruit-platter.jpg',
  grilledChickenPotatoes: 'items/grilled-chicken-potatoes.jpg',
  pinkFloralCake1: 'items/pink-floral-cake-1.jpg',
  pinkFloralCake2: 'items/pink-floral-cake-2.jpg',
  pinkFloralCake3: 'items/pink-floral-cake-3.jpg',
  whitePinkFloralCake: 'items/floral-white-and-pink-cake.jpg',
  pizza: 'items/pizza.jpg',
  purpleFloralCake: 'items/purple-floral-cake.jpg',
  redVelvetCake: 'items/red-velvet-cake.jpg',
  savoryDelights: 'items/savory-delights.jpg',
  snackBowl: 'items/snack-bowl.jpg',
  squareCake: 'items/square-cake.jpg',
  stirFriedNoodles: 'items/stir-fried-noodles.jpg',
  superheroCake: 'items/superhero-cake.jpg',
  weddingCake: 'items/wedding-cake.jpg',
  weddingCake2: 'items/wedding-cake-2.jpg',
  whiteFloralCake: 'items/white-floral-cake.jpg',
  whitePrincessThemedCake: 'items/white-princess-cake.jpg',
  chocolateBrownies: 'items/chocolate-brownies.jpg',
  cocomelonCake: 'items/cocomelon-themed-cake.jpg',
  princessCake1: 'items/princess-themed-cake-1.jpg',
  princessCake2: 'items/princess-themed-cake-2.jpg',
};

const filter = {
  CAKES: 'Cakes',
  CUPCAKES: 'Cupcakes',
  COOKIES: 'Cookies',
  DESSERT_CUPS: 'Dessert Cups',
  BREAK_FAST_BOX: 'Breakfast Box',
  SNACKS: 'Snacks',
  PASTA: 'Pasta',
  SHRIMPS: 'Shrimps',
  SOUPS: 'Soups',
  CHICKEN: 'Chicken',
  PIZZA: 'Pizza',
  NOODLES: 'Noodles',
  FRUITS: 'Fruits',
  DONUTS: 'Donuts',
  BROWNIES: 'Brownies',
};

const itemsData = [
  {
    name: '2 Tiers Wedding Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components:
      'Vanilla And Red Velvet Layers, Strawberry and Cream Cheese Filling',
    price: 9000,
    size: {
      Large: '9000',
    },
    image: image.weddingCake,
    alt: 'Wedding Cake',
  },

  {
    name: 'Stir Fried Noodles',
    category: 'Savory',
    filter: filter.NOODLES,
    flavors: ['Beef', 'Chicken', 'Shrimp'],
    components: 'Onions, Carrots, Protein, Cabbage',
    price: 350,
    size: {
      Protein: '350',
      Mixed: '450',
    },
    image: image.stirFriedNoodles,
    alt: 'Stir Fried Noodles',
  },

  {
    name: '3 Tiers Wedding Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Flavor Layers, Strawberry and Cream Cheese Filling',
    price: 14000,
    size: {
      Large: '14000',
    },
    image: image.weddingCake2,
    alt: 'Wedding Cake',
  },

  {
    name: 'Fried Chicken',
    category: 'Savory',
    filter: filter.CHICKEN,
    components: 'Chicken, Fries, Ketchup',
    price: 350,
    size: {
      '3Pcs': '350',
      '6Pcs': '500',
    },
    image: image.friedChicken,
    alt: 'Fried Chicken',
  },

  {
    name: 'Donuts',
    category: 'Sweet',
    filter: filter.DONUTS,
    components: 'Vanilla Custard, Berry Jam, Nutella Filling',
    price: 300,
    size: {
      '3Pcs': '300',
      '12Pcs': '1500',
    },
    image: image.donuts,
    alt: 'Donuts',
  },

  {
    name: 'Chicken Afra',
    category: 'Savory',
    filter: filter.CHICKEN,
    components: 'Chicken, Mashed Potatotes, BBQ Sauce',
    price: 300,
    size: {
      '1 Dish': '300',
    },
    image: image.chickenAfra,
    alt: 'Chicken Afra',
  },

  {
    name: 'Ebbeh',
    category: 'Savory',
    filter: filter.SOUPS,
    components: 'Crabs, Cassava, Palm Oil',
    price: 250,
    size: {
      '1 Dish': '250',
    },
    image: image.ebbeh,
    alt: 'Ebbeh',
  },

  {
    name: 'Breaded Fried Shrimps',
    category: 'Savory',
    filter: filter.SHRIMPS,
    components: 'Shrimps, Fries, Ketchup',
    price: 400,
    size: {
      Medium: '400',
      Large: '600',
    },
    image: image.breadedFriedShrimp,
    alt: 'Breaded Fried Shrimps',
  },

  {
    name: 'Alfredo Pasta',
    category: 'Savory',
    filter: filter.PASTA,
    components: 'Creamy Alfredo Sauce, Protein',
    price: 350,
    size: {
      Chicken: '450',
      Beef: '450',
      Shrimp: '450',
    },
    image: image.alfredoShrimpPasta,
    alt: 'Alfredo Pasta',
  },

  {
    name: 'Pizza',
    category: 'Savory',
    filter: filter.PIZZA,
    flavors: ['Beef', 'Chicken', 'Shrimp'],
    components: 'Tomato Sauce, Green Pepper, Tomato',
    price: 350,
    size: {
      Medium: '400',
      Large: 'D600',
    },
    image: image.pizza,
    alt: 'Pizza',
  },

  {
    name: 'Square Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocalate Icing, White Chocolate Buttercream',
    price: 5500,
    size: {
      Small: '4500',
      Medium: '5500',
      Large: '6500',
    },
    image: image.squareCake,
    alt: 'Square Cake',
  },

  {
    name: 'Red Velvet Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Gold Sheets, Candy Pearls, White Chocolate Buttercream',
    price: 3000,
    size: {
      Small: '3000',
    },
    image: image.redVelvetCake,
    alt: 'Red Velvet Cake',
  },

  {
    name: 'Savory Delights',
    category: 'Savory',
    filter: filter.SNACKS,
    components:
      'Grilled Drum Sticks, Shrimp Spring Roll, Shrimp Frirecrackers, Meat Pie',
    price: 200,
    size: {
      '1 Pack': '200',
    },
    image: image.savoryDelights,
    alt: 'Savory Delights',
  },

  {
    name: 'Snack Bowl',
    category: 'Savory',
    filter: filter.SNACKS,
    components:
      'Mini Burger, Chicken Batbout, Hot Dog, Beef Bun, Meat Pie, Beef Wrap',
    price: 500,
    size: {
      '1 Bowl': '500',
    },
    image: image.snackBowl,
    alt: 'Savory Delights',
  },

  {
    name: 'Chocolate Overload Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate Ganache, White Chocolate Buttercream',
    price: 5000,
    size: {
      Medium: '5000',
      Large: '6000',
    },
    image: image.chocolateOverloadCake,
    alt: 'Chocolate Overload Cake',
  },

  {
    name: 'Fruit Platter',
    category: 'Sweet',
    filter: filter.FRUITS,
    components: 'Watermelon, Pineapple, Orange, Mandarine, Grapes',
    price: 2500,
    size: {
      '1Pc': '2500',
    },
    image: image.fruitPlatter,
    alt: 'Fruit Platter',
  },

  {
    name: 'White Floral Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 3500,
    size: {
      Small: '3500',
    },
    image: image.whiteFloralCake,
    alt: 'Barbie Cake',
  },

  {
    name: 'Chocolate Cupcakes',
    category: 'Sweet',
    filter: filter.CUPCAKES,
    components: 'White Chocolate Buttercream',
    price: 2000,
    size: {
      '12Pcs': '2000',
    },
    image: image.cupcakes,
    alt: 'Chocolate Cupcakes',
  },

  {
    name: 'Barbie Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.barbieCake,
    alt: 'Barbie Cake',
  },

  {
    name: 'Chicken Batbout',
    category: 'Savory',
    filter: filter.CHICKEN,
    components: 'Chicken, Lettuce, Cheese, Special Sauce',
    price: 500,
    size: {
      '1 Dish': '450',
    },
    image: image.chickenBatbouts,
    alt: 'Savory Delights',
  },

  {
    name: 'Sugar Cookies',
    category: 'Sweet',
    filter: filter.COOKIES,
    components: 'Sugar Cookies',
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
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components:
      'Vanilla Cake, White Chocolate Biscoff Buttercream, Biscoff Spread',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
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
    image: image.purpleFloralCake,
    alt: 'Cheesecake Dessert Cups',
  },

  {
    name: 'Pink Floral Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.pinkFloralCake3,
    alt: 'Pink Floral Cake',
  },

  {
    name: 'Superhero Themed Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Flavor of Choice',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.superheroCake,
    alt: 'Superhero Themed Cake',
  },

  {
    name: 'Princess Themed Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 5000,
    size: {
      Medium: '5000',
      Large: '6500',
      XLarge: '7500',
    },
    image: image.princessCake1,
    alt: 'Princess Themed Cake',
  },

  {
    name: 'Princess Themed Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 5000,
    size: {
      Medium: '5000',
      Large: '6500',
      XLarge: '7500',
    },
    image: image.princessCake2,
    alt: 'Princess Themed Cake',
  },

  {
    name: 'Finger Food Tray',
    category: 'Savory',
    filter: filter.SNACKS,
    components:
      '(5 Each) Mini Burgers, Mini Pizza, Chicken Batbout, Hotdogs, Beef Wraps',
    price: 3000,
    size: {
      '25Pcs': '3000',
    },
    image: image.fingerFoodTray,
    alt: 'Finger Food Tray',
  },

  {
    name: 'Chocolate Brownies',
    category: 'Sweet',
    filter: filter.BROWNIES,
    components: 'Nutella and Biscoff Topping',
    price: 1500,
    size: {
      '4Pcs': '500',
      '8Pcs': '800',
      '12Pcs': '1500',
    },
    image: image.chocolateBrownies,
    alt: 'Chocolate Brownies',
  },

  {
    name: 'Dark Themed Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.darkThemedCake,
    alt: 'Dark Themed Cake',
  },

  {
    name: 'Cocomelon Themed Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.cocomelonCake,
    alt: 'Cocomelon Themed Cake',
  },

  {
    name: 'Sliced Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate Mousse, Chocolate Ganache',
    price: 400,
    size: {
      '1 Slice': '400',
    },
    image: image.cakeSlice,
    alt: 'Sliced Cake',
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
    name: 'White-Pink Floral Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
      XLarge: '6500',
    },
    image: image.whitePinkFloralCake,
    alt: 'White-Pink Floral Cake',
  },

  {
    name: 'Princess Themed Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.whitePrincessThemedCake,
    alt: 'Princess Themed Cake',
  },

  {
    name: 'Pink Floral Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.pinkFloralCake2,
    alt: 'Pink Floral Cake',
  },

  {
    name: 'Chicken And Mashed Potatoes',
    category: 'Savory',
    filter: filter.CHICKEN,
    components: 'Grilled Chicken, Mashed Poatates, Barbecue Sauce',
    price: 375,
    size: {
      '1 Dish': '375',
    },
    image: image.grilledChickenPotatoes,
    alt: 'Chicken And Mashed Potatoes',
  },

  {
    name: 'Purple Floral Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Flavor of Choice',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.purpleFloralCake,
    alt: 'Purple Floral Design Cake',
  },

  {
    name: 'Pink Floral Cake',
    category: 'Sweet',
    filter: filter.CAKES,
    flavors: ['Chocolate', 'Vanilla', 'Red Velvet'],
    components: 'Chocolate icing',
    price: 4500,
    size: {
      Medium: '4500',
      Large: '5500',
    },
    image: image.pinkFloralCake1,
    alt: 'Pink Floral Cake',
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
