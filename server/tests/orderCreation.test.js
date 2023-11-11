const app = require('../index');
const supertest = require('supertest');
const Order = require('../database/models/orderModel');
const databaseConnection = require('./database/databaseConnection');

const firstName = 'John';
const lastName = 'Doe';
const email = 'abdoulaye@gmail.com';
const number = '1234567890';
const residence = 'New York';
const service = 'Pick up';
const paymentMethod = 'Cash';
const total = '1000';
const cart = ['1', '2', '3'];
const datesAndTimes = {
  nonCake: { selectedDate: '1', selectedTime: '0' },
  cake: { selectedDate: '1', selectedTime: '0' },
};

beforeAll(async () => {
  await databaseConnection.openDBConnection();
});

afterAll(async () => {
  await databaseConnection.closeDBConnection();
});

describe('Order creation test', () => {
  it('Successfull order creation test', async () => {
    const reponse = await supertest(app)
      .post('/api/orders')
      .send({
        firstName,
        lastName,
        email,
        number,
        residence,
        service,
        paymentMethod,
        total,
        cart,
        datesAndTimes,
      });

    expect(reponse.status).toBe(200);
  });
});
