const Users = require('../users/users_model');
const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

/* 1. does it return the correct status code for the input provided?
   2. does it return the data in the expected format?
   3. does the data returned, if any, have the right content? */

/* When testing your endpoints, start with those three tests and then move on to write tests that will be unique for the system you’re building.*/

describe('/POST', () => {
  it('should return 200 OK', async () => {
    const call = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Rockey9', password: '123' });
    expect(call.status).toBe(201);
  });
  it('should return a 500 database error', async () => {
    const reg = await request(server).post('/api/auth/register');
    expect(reg.status).toBe(500);
  });
});

describe('/POST', () => {
  it('should return 200 OK', async () => {
    const logintest = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Rockey9', password: '123' });
    expect(logintest.status).toBe(201);
  });
  it('should return a 500 database error', async () => {
    const login = await request(server).post('/api/auth/login');
    expect(login.status).toBe(500);
  });
});

it('should set testing environment', () => {
  expect(process.env.DB_ENV).toBe('testing');
});

describe('users model', () => {
  // beforeAll()
  beforeEach(async () => {
    await db('users').truncate();
  });
  // afterEach()
  // afterAll()

  describe('insert()', () => {
    it('should add user to database', async () => {
      // check that table is empty
      const records = await db('users');
      expect(records).toHaveLength(0);

      // insert one record
      await Users.add({ username: 'sam', password: '1234' });

      // check we now have one record in the table
      const users = await db('users');
      expect(users).toHaveLength(1);
    });
  });

  it('should add the provided user to database', async () => {
    let users = await Users.add({ username: 'roc', password: '123' });
    expect(users.username).toBe('roc');

    users = await Users.add({ username: 'mike', password: '124' });
    expect(users.username).toBe('mike');

    const user = await db('users');
    expect(user).toHaveLength(2);
  });
});
