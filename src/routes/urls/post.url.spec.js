const { agent, createTestUrl, createTestUser } = require('../../config/test-service');

jest.mock('request-promise-native');
jest.setTimeout(60000);

describe('POST /url', () => {
  it('should fail if all fields is  not provided', async () => {
    const testUser = await createTestUser('King', 'David', 'kingdave@gmail.com', 'DVAID3443!!!');

    const response = await agent
      .post('/urls')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send({});
    expect(response.status).toEqual(400);
  });

  it('should create transaction', async () => {
    const testUser = await createTestUser('King', 'David', 'kingdave@gmail.com', 'DVAID3443!!!');
    const originalLink = 'https://example.com/about-us/the_rise_of_example_company_in_the_global_market';
    const expirationDate = new Date('14-03-2024');

    const response = await agent
      .post('/urls')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send({ original_link: originalLink, expirationDate });

    expect(response.status).toEqual(201);
    expect(response.body.url.original_link).toEqual(originalLink);
  });
});
