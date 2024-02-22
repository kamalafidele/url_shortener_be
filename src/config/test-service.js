const request = require('supertest');
const { v4: uuidv4 } = require('uuid');
const UserRepo = require('../repositories/UserRepo');
const UrlRepo = require('../repositories/UrlRepo');
const app = require('../../test-server')();
const db = require('./test-db');

const agent = request.agent(app);

beforeAll(async () => {
  await db.connect();
});

beforeEach(async () => {
  jest.setTimeout(90000);
  await db.clear();
});

async function createTestUser(firstName, lastName, email, password) {
  // For registering the user
  await agent.post('/auth/register').set('Accept', 'application/json').send({ firstName, lastName, email, password });
  const user = await UserRepo.findUserByEmail(email);

  // Logging in the user
  const login = await agent.post('/auth/login').set('Accept', 'application/json').send({ email, password });

  const token = login.body.jwt_token;

  return {
    token,
    user,
  };
}

async function createTestUrl(original_link, userId, expirationDate) {
  const data = { original_link, user: userId, uniqueIdentifier: uuidv4(), expirationDate };
  return UrlRepo.create(data);
}

module.exports = {
  agent,
  db,
  createTestUser,
  createTestUrl,
};
