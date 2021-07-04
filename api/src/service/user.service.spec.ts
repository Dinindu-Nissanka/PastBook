import { createUser } from './user.service';
import { connect, clearDatabase, closeDatabase } from '../test/db.helper';

const email = 'test@test.com';

describe('User service Test', () => {
  /**
   * Connect to a new database before running any tests.
   */
  beforeAll(async () => {
    await connect();
  });

  /**
   * Clear all test data after every test.
   */
  afterEach(async () => await clearDatabase());

  /**
   * Remove and close the db and server.
   */
  afterAll(async () => await closeDatabase());

  it('create and save user successfully', async () => {
    const savedUser = await createUser({
      email: 'test@test.com',
      password: '12345678',
      name: 'Test user',
    });

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(email);
  });
});
