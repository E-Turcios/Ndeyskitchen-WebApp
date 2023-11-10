const app = require('../index');
const supertest = require('supertest');

describe('Items options fetching', () => {
  it('Successfull items options fetching', async () => {
    const response = await supertest(app).get('/api/items/get-item-options');

    expect(response.statusCode).toBe(200);
  });
});
