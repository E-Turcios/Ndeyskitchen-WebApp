const app = require('../index');
const supertest = require('supertest');

describe('Minimum and maximum dates/tims fetching', () => {
  it('Successfull ates and times fetched from the server where filter is cakes', async () => {
    const response = await supertest(app).get('/api/items/get-dates-and-times');

    expect(response.statusCode).toBe(200);
  });
});
