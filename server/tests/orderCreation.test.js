const app = require('../index');
const supertest = require('supertest');
const Order = require('../database/models/orderModel');
const Counter = require('../database/models/counterModel');
const databaseConnection = require('./database/databaseConnection');

const firstName = 'John';
const lastName = 'Doe';
const email = 'abdoulaye@gmail.com';
const number = '1234567890';
const residence = 'New York';
const service = 'Pick up';
const paymentMethod = 'Cash';
const total = '1000';
const items = ['1', '2', '3'];
const datesAndTimes = {
  nonCake: { selectedDate: '1', selectedTime: '0' },
  cake: { selectedDate: '1', selectedTime: '0' },
};

const information = {
  firstName,
  lastName,
  email,
  number,
  residence,
  service,
  paymentMethod,
  total,
  items,
  datesAndTimes,
};

beforeAll(async () => {
  await databaseConnection.openDBConnection();
});

afterAll(async () => {
  await Order.deleteMany({}).then(() => {
    console.log('All order deleted successfully');
  });

  await Counter.deleteMany({}).then(() => {
    console.log('All counters deleted successfully');
  });
  await databaseConnection.closeDBConnection();
});

describe('Order creation test', () => {
  it('Successfull order creation test', async () => {
    const reponse = await supertest(app)
      .post('/api/orders')
      .send({ information });

    expect(reponse.status).toBe(200);
  });
});
