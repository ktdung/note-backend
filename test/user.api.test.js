const bcrypt = require('bcrypt');
const supertest = require('supertest');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const User = require('../models/user');
const app = require('../app');
const helper = require('../test/test_helper');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('hi', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'dungkt',
      name: 'k t dung',
      password: 'hi',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    // expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    // using node:test
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    // expect(usernames).toContain(newUser.username);
    assert(usernames.includes(newUser.username));
  });

  test('create fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'dungkt',
      name: 'Superuser',
      password: 'root',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'expected `username` to be unique'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
