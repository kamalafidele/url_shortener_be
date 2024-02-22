const { agent, createTestUser, createTestUrl } = require('../../config/test-service');

jest.mock('request-promise-native');
jest.setTimeout(50000);

describe('GET urls/:uniqueIdentifier', () => {
  it('should not work if url identifier does not exist', async () => {
    const testUser = await createTestUser('john', 'doe', 'johndoe@gmail.com', 'JOHN_322_DOE');
    const imaginaryIdentifier = '094903jrfdsnfdsaf';

    const response = await agent
      .get(`/urls/${imaginaryIdentifier}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${testUser.token}`);

    expect(response.body.url).toEqual(null);
  });

  it('should retrieve the url if identifier exists', async () => {
    const testUser = await createTestUser('john', 'doe', 'johndoe@gmail.com', 'JOHN_322_DOE');
    const originalLink = 'https://example.com/about-us/the_rise_of_example_company_in_the_global_market';
    const today = new Date();
    const expirationDate = new Date(today.setDate(today.getDate() + 3));
    const testUrl = await createTestUrl(originalLink, testUser.user._id, expirationDate);

    const response = await agent
      .get(`/urls/${testUrl.uniqueIdentifier}`)
      .set('Accept', 'Application/json')
      .set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.url.uniqueIdentifier).toEqual(testUrl.uniqueIdentifier);
  });
});
