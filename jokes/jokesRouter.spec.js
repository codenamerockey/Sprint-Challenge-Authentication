const request = require('supertest');

const server = require('./jokes-router.js');

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
  it('should return 200 http status code', () => {
    return request(server)
      .get('/api/jokes')
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  // should return json
  test('should return JSON', async () => {
    const response = await request(server).get('/api/jokes');

    // toMatch uses a regular expression to check the value
    expect(response.type).toMatch(/json/i);
  });
});
