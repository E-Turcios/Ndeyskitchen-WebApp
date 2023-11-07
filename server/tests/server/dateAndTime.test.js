const app = require('../../index');
const supertest = require('supertest');

const databaseConnection = require('../database/databaseConnection');

const item = {
  filter: 'Cakes',
};

const anotherItem = {
  noFilter: '',
};

describe('Minimum and maximum dates/tims fetching', () => {
  it('Successfull ates and times fetched from the server where filter is cakes', async () => {
    const response = await supertest(app)
      .get('/api/items/get-dates-and-times')
      .send({ item: item });

    expect(response.statusCode).toBe(200);
  });

  it('Failed dates and times succesfuly fetched from the server where filter is another', async () => {
    const response = await supertest(app)
      .get('/api/items/get-dates-and-times')
      .send({ item: anotherItem });
    expect(response.statusCode).toBe(404);
  });
});
