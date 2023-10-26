const app = require('../../index');
const supertest = require('supertest');
const User = require('../../database/models/userModel');
const databaseConnection = require('../database/databaseConnection');

const data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'gtczllwpgshmnenmha@ckptr.com',
  password: 'password',
  number: '1010101011',
};

const googleData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@gmail.com',
  sub: 'ushgjkdshksdmvjdshds',
};

const wrongGoogleData = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@gmail.com',
  sub: 'ushgjkdshksdmvjdshds',
};

let token;

beforeAll(async () => {
  await databaseConnection.openDBConnection();
});

afterAll(async () => {
  try {
    const user = await User.deleteOne({
      email: data.email,
    });

    const googleUser = await User.deleteOne({
      email: googleData.email,
    });

    if (user.deletedCount === 1 && googleUser.deletedCount === 1)
      console.log('Users successfully deleted');
  } catch (error) {
    console.log(error);
  }

  databaseConnection.closeDBConnection().then(() => {
    console.log('Database connection successfully closed!');
  });
});

describe('Verification email link test', () => {
  it('Successful verification email generated', async () => {
    const response = await supertest(app)
      .post('/api/users/verify-email-link')
      .send(data)
      .expect(res => {
        token = res.body.token;
      });

    expect(response.statusCode).toEqual(200);
  });
});

describe('User Creation test', () => {
  it('Successful user creation test', async () => {
    const response = await supertest(app)
      .post('/api/users/')
      .send({ userToken: token });

    expect(response.statusCode).toEqual(200);
  });

  it('Failed user creation test', async () => {
    const newToken = token + '_added_value';
    const response = await supertest(app)
      .post('/api/users/')
      .send({ userToken: newToken });
    expect(response.statusCode).toBe(401);
  });

  it('Successful google user creation test', async () => {
    const response = await supertest(app)
      .post('/api/users/createGoogleUser')
      .send(googleData);

    expect(response.statusCode).toEqual(200);
  });

  it('Failed google user creation test', async () => {
    const response = await supertest(app)
      .post('/api/users/createGoogleUser')
      .send(wrongGoogleData);
    expect(response.statusCode).toBe(400);
  });
});
