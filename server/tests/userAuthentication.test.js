const app = require('../../server/index');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const User = require('../../server/database/models/userModel');
const databaseConnection = require('./database/databaseConnection');

const data = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  password: 'password',
  number: '1010101010',
};

const data1 = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password',
  number: '1010101011',
};

const wrongData = {
  email: 'john@example.com',
  password: 'wrongpassword',
};

beforeAll(async () => {
  await databaseConnection.openDBConnection();

  const hash = await bcrypt.hash(data.password, 11);

  try {
    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hash,
      number: data.number,
    });
    if (user) console.log('User successfully created');
  } catch (error) {
    console.log(error);
  }
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

describe('Auhentication test', () => {
  it('In-house login test', async () => {
    const response = await supertest(app).post('/api/users/getUser').send(data);

    expect(response.statusCode).toEqual(200);
  });

  it('Failed in-house login test', async () => {
    const response = await supertest(app)
      .post('/api/users/getUser')
      .send(wrongData);
    expect(response.statusCode).toBe(404);
  });
});
