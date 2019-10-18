const server = require('./usersRouter');
const request = require('supertest');

describe('GET', () => {
  it('should set testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  it('returns 200 OK', () => {
    return request(server)
      .get('/')
      .expect(200);
  });
});
