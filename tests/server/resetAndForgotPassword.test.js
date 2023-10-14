const app = require('../../server/index');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const User = require('../../server/database/models/userModel');
const databaseConnection = require('./databaseConnection');

const data = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  password: 'password',
  number: '1010101010',
};

const wrongData = {
  email: 'john@example.com',
};

let token;

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

describe('Forgot test', () => {
  it('Successful forgot password test', async () => {
    const response = await supertest(app)
      .post('/api/users/forgot-password')
      .send(data)
      .expect(res => {
        const token = res.body.token;
        console.log(token);
      });

    expect(response.statusCode).toEqual(200);
  });

  it('Failed forgot password test', async () => {
    const response = await supertest(app)
      .post('/api/users/forgot-password')
      .send(wrongData);
    expect(response.statusCode).toBe(404);
  });
});

describe('Reset link test', () => {
  it('Successful reset link password test', async () => {
    const response = await supertest(app)
      .post('/api/users/reset-password-link')
      .send(token);
    expect(response.statusCode).toEqual(200);
  });

  it('Failed reset password link test', async () => {
    const response = await supertest(app)
      .post('/api/users/reset-password-link')
      .send(token + 'added value');
    console.log(token + 'added value');
    expect(response.statusCode).toBe(401);
  });
});
