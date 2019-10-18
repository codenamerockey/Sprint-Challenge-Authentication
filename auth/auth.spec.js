const Users = require('../users/users_model');

const db = require('../database/dbConfig');

/* 1. does it return the correct status code for the input provided?
   2. does it return the data in the expected format?
   3. does the data returned, if any, have the right content? */

/* When testing your endpoints, start with those three tests and then move on to write tests that will be unique for the system you’re building.*/

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
