const app = require('../../index');
const supertest = require('supertest');

let cartToken = [1, 2, 4];

describe('Cart Token Decrpytion', () => {
  it('Successfull items options fetching', async () => {
    const response = await supertest(app)
      .post('/api/items/decrypt-local-storage')
      .send({ cartToken });

    expect(response.statusCode).toBe(200);
  });

  it('Failed items options fetching', async () => {
    const response = await supertest(app).post(
      '/api/items/decrypt-local-storage'
    );

    expect(response.statusCode).toBe(400);
  });
});
