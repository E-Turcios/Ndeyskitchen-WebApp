const app = require('../../server/index');
const supertest = require('supertest');
const User = require('../../server/database/models/userModel');
const databaseConnection = require('./databaseConnection');

const data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'abdoul92i@yahoo.com',
  password: 'password',
  number: '1010101011 ',
};

const missingData = {
  email: 'abdoul92i@yahoo.com',
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

describe('User Creation test', () => {
  it('Successful user creation test', async () => {
    const response = await supertest(app).post('/api/users/').send(data);

    expect(response.statusCode).toEqual(200);
  });

  xit('Failed user creation test', async () => {
    const response = await supertest(app).post('/api/users/').send(missingData);
    expect(response.statusCode).toBe(400);
  });

  xit('Successful google user creation test', async () => {
    const response = await supertest(app)
      .post('/api/users/createGoogleUser')
      .send(googleData);

    expect(response.statusCode).toEqual(200);
  });

  xit('Failed google user creation test', async () => {
    const response = await supertest(app)
      .post('/api/users/createGoogleUser')
      .send(wrongGoogleData);
    expect(response.statusCode).toBe(400);
  });
});
