const app = require('../../index');
const supertest = require('supertest');

let emptyCartToken = [];
let filledCartToken = [1, 2, 3];
let localStorage = [1, 2, 3];

describe('Cart token Encryption And Decryption', () => {
  it('Successfull cart token encryption', async () => {
    const response = await supertest(app)
      .post('/api/items/encrypt-local-storage')
      .send({ localStorage })
      .expect(res => {
        token = res.body.token;
        filledCartToken = token;
      });

    expect(response.statusCode).toBe(200);
  });

  it('Successfull cart token decryption fetching when there is no token', async () => {
    const response = await supertest(app)
      .post('/api/items/decrypt-local-storage')
      .send({ cartToken: filledCartToken });

    expect(response.statusCode).toBe(200);
  });

  it('Successfull cart token decryption fetching response when there is no token', async () => {
    const response = await supertest(app)
      .post('/api/items/decrypt-local-storage')
      .send({ cartToken: emptyCartToken });

    expect(response.statusCode).toBe(400);
  });
});
