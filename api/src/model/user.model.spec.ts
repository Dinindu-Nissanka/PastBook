import User from './user.model';
import { connect, clearDatabase, closeDatabase } from '../test/db.helper';

const userData = {
  email: 'test@test.com',
  password: '12345678',
  name: 'Test user',
};

describe('User Model Test', () => {
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

  it('create & save user successfully', async () => {
    const savedUser = await User.create({
      email: 'test@test.com',
      password: '12345678',
      name: 'Test user',
    });
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(await savedUser.comparePassword(userData.password)).toBe(true);
  });
});
