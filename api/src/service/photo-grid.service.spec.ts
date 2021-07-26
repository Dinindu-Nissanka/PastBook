import { createPhotoGrid } from './photo-grid.service';
import { connect, clearDatabase, closeDatabase } from '../test/db.helper';

const photoGridData = {
  grid: [
    {
      id: 'ss',
      order: 1,
    },
    {
      id: 'sss',
      order: 2,
    },
    {
      id: 'sss',
      order: 3,
    },
    {
      id: 'sss',
      order: 4,
    },
    {
      id: 'sss',
      order: 5,
    },
    {
      id: 'sss',
      order: 6,
    },
    {
      id: 'sss',
      order: 7,
    },
    {
      id: 'sss',
      order: 8,
    },
    {
      id: 'sss',
      order: 9,
    },
  ],
};

const email = 'test@test.com';

describe('Photo grid service Test', () => {
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

  it('create and save photo grid successfully', async () => {
    const savedPhotoGrid = await createPhotoGrid(
      'test@test.com',
      photoGridData
    );

    expect(savedPhotoGrid.email).toBe(email);
    expect(savedPhotoGrid.grid.length).toBe(photoGridData.grid.length);
  });
});
