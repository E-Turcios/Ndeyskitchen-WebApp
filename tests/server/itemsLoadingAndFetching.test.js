const app = require('../../server/index');
const supertest = require('supertest');
const Item = require('../../server/database/models/itemModel');
const databaseConnection = require('../database/databaseConnection');

const chalk = require('chalk');

const itemsData = [
  {
    name: 'CHOCOLATE CAKE',
    category: 'Sweet',
    components: 'Chocolate filling, vanilla icing',
    price: 20.99,
    image: 'tests/database/test-image.jpeg',
  },

  {
    name: 'PUMPKIN CAKE',
    category: 'Sweet',
    components: 'Chocolate filling, chocolate icing',
    price: 15.99,
    image: 'tests/database/test-image.jpeg',
  },

  {
    name: 'CHOCOLATE CAKE',
    category: 'Sweet',
    components: 'Vanilla filling, vanilla icing',
    price: 25.99,
    image: 'tests/database/test-image.jpeg',
  },

  {
    name: 'VANILLA CAKE',
    category: 'Sweet',
    components: 'Vanilla filling, vanilla icing',
    price: 25.0,
    image: 'tests/database/test-image.jpeg',
  },

  {
    name: 'PIZZA',
    category: 'Salty',
    components: 'Tomato sauce, cheese',
    price: 20.99,
    image: 'tests/database/test-image.jpeg',
  },

  {
    name: 'CHICKEN WINGS',
    category: 'Salty',
    components: 'BBQ sauce',
    price: 10.99,
    image: 'tests/database/test-image.jpeg',
  },
];

async function itemsLoading() {
  try {
    const result = await Item.insertMany(itemsData);

    if (result) {
      console.log(chalk.cyan('Items data loaded successfully'));
      return true;
    }
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

beforeAll(async () => {
  await databaseConnection.openDBConnection().then(() => {
    console.log('Database connection successfully established');
  });
});

afterAll(async () => {
  databaseConnection.closeDBConnection().then(() => {
    console.log('Database connection successfully closed');
  });
});

describe('Items loading into database test', () => {
  it('Items succesfuly loaded into database', async () => {
    const success = await itemsLoading();

    expect(success).toBe(true);
  });
});
