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

const wrongData = {
  email: 'john@example.com',
};

let userToken;

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
        userToken = res.body.token;
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

describe('Reset password link test', () => {
  it('Successful reset link password test', async () => {
    console.log(userToken);
    const response = await supertest(app)
      .post('/api/users/reset-password-link')
      .send({ userToken });
    expect(response.statusCode).toEqual(200);
  });

  it('Failed reset password link test', async () => {
    const newToken = userToken + '_added_value';
    console.log(newToken);
    const response = await supertest(app)
      .post('/api/users/reset-password-link')
      .send({ userToken: newToken });
    expect(response.statusCode).toBe(401);
  });
});

describe('Reset password test', () => {
  it('Successful reset password test', async () => {
    console.log(userToken);
    const response = await supertest(app)
      .post('/api/users/reset-password')
      .send({ password: '1234567890', userToken });
    expect(response.statusCode).toEqual(200);
  });

  it('Failed reset password test', async () => {
    const newToken = userToken + '_added_value';
    console.log(newToken);
    const response = await supertest(app)
      .post('/api/users/reset-password-link')
      .send({ password: '1234567890', userToken: newToken });
    expect(response.statusCode).toBe(401);
  });
});
