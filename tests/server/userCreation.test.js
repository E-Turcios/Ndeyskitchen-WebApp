const app = require('../../server/index');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const User = require('../../server/database/models/userModel');
const databaseConnection = require('./databaseConnection');

const data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password',
  number: '1010101011',
};

const wrongData = {
  email: 'john@example.com',
  password: 'password',
  number: '1010101011',
};

const timeout = 10000;

beforeAll(async () => {
  await databaseConnection.openDBConnection();
});

afterAll(async () => {
  try {
    const user = await User.deleteOne({
      email: data.email,
    });
    if (user.deletedCount === 1) console.log('User successfully deleted');
  } catch (error) {
    console.log(error);
  }

  databaseConnection.closeDBConnection().then(() => {
    console.log('Database connection successfully closed!');
  });
});

describe('User Creation test', () => {
  it(
    'Successful user creation test',
    async () => {
      const response = await supertest(app).post('/api/users/').send(data);

      expect(response.statusCode).toEqual(200);
    },
    timeout
  );

  it(
    'Failed user creation test',
    async () => {
      const response = await supertest(app).post('/api/users/').send(wrongData);
      expect(response.statusCode).toBe(400);
    },
    timeout
  );
});
