const request = require('supertest');
const authenticate = require('../auth/authenticate-middleware');
const server = require('../api/server');
const jwt = require('jsonwebtoken');

/* 1. does it return the correct status code for the input provided?
   2. does it return the data in the expected format?
   3. does the data returned, if any, have the right content? */

/* When testing your endpoints, start with those three tests and then move on to write tests that will be unique for the system you’re building.*/

describe('GET /', () => {
  it('has process.env.DB_ENV as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  //check to make sure we get the correct status code back

  // should return http 200 ok
  it('should return 200 http status code', async () => {
    const joke = await request(server)
      .get('/api/jokes')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvYzciLCJzdWJqZWN0Ijo2LCJpYXQiOjE1NzE0MzA1ODAsImV4cCI6MTU3MTQzNDE4MH0.suTkDvvulYJGj6nDHaPhGd5fg3vSZqWSjUXNUUoYCSs'
      );

    expect(joke.status).toBe(200);
  });

  // should return json
  test('should return JSON', async () => {
    const response = await request(server).get('/api/jokes');

    // toMatch uses a regular expression to check the value
    expect(response.type).toMatch(/json/i);
  });
});
