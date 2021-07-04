import { app } from './app';
import request from 'supertest';
import { clearDatabase, closeDatabase, connect } from './test/db.helper';

describe('End to end testing', () => {
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

  it('returns unauthorized error when access token not provided in get uploaded images of an user', async () => {
    const result = await request(app).get('/api/uploaded-images');
    expect(result.text).toEqual('Unauthorized');
    expect(result.statusCode).toEqual(401);
  });

  it('returns unauthorized error when access token not provided in get uploaded photo grid of an user', async () => {
    const result = await request(app).get('/api/photogrid');
    expect(result.text).toEqual('Unauthorized');
    expect(result.statusCode).toEqual(401);
  });

  it('returns unauthorized error when access token not provided in get uploaded images of an user', async () => {
    const result = await request(app).post('/api/photogrid');
    expect(result.text).toEqual('Unauthorized');
    expect(result.statusCode).toEqual(401);
  });

  it('returns the jwt token for user sign up', async () => {
    const result = await request(app).post('/api/signup').send({
      name: 'test',
      email: 'test@test.com',
      password: '12345678',
    });
    expect(result.text).toContain('token');
    expect(result.statusCode).toEqual(201);
  });

  it('returns the email validation error for user sign up', async () => {
    const result = await request(app).post('/api/signup').send({
      name: 'test',
      email: 'testtest.com',
      password: '12345678',
    });
    expect(result.text).toContain('body.email must be a valid email');
    expect(result.statusCode).toEqual(400);
  });

  it('returns the password validation error in minimum number for user sign up', async () => {
    const result = await request(app).post('/api/signup').send({
      name: 'test',
      email: 'test@test.com',
      password: '1234567',
    });
    expect(result.text).toContain(
      'body.password must be at least 8 characters'
    );
    expect(result.statusCode).toEqual(400);
  });

  it('returns the password validation error in maximum number for user sign up', async () => {
    const result = await request(app).post('/api/signup').send({
      name: 'test',
      email: 'test@test.com',
      password: '1234567123456',
    });
    expect(result.text).toContain(
      'body.password must be at most 12 characters'
    );
    expect(result.statusCode).toEqual(400);
  });

  it('returns the user not found error for invalid user in user login', async () => {
    const result = await request(app).post('/api/login').send({
      email: 'test@test.com',
      password: '123456712',
    });
    expect(result.text).toContain('User not found');
    expect(result.statusCode).toEqual(403);
  });

  it('returns the token fo a valid user in user login', async () => {
    await request(app).post('/api/signup').send({
      email: 'test@test.com',
      password: '123456712',
      name: 'test',
    });
    const result = await request(app).post('/api/login').send({
      email: 'test@test.com',
      password: '123456712',
    });
    expect(result.text).toContain('token');
    expect(result.statusCode).toEqual(200);
  });

  // it('returns the uploaded images for the user', async () => {
  //   const resultSignUp = await request(app).post('/api/signup').send({
  //     email: 'help@pastbook.com',
  //     password: '123456712',
  //     name: 'test',
  //   });

  //   const Images = await request(app)
  //     .get('/api/uploaded-images')
  //     .set({
  //       Authorization: `Bearer ${resultSignUp.body.token}`,
  //     });
  //   expect(Images.body).toBe(Array);
  //   expect(Images).toEqual(200);
  // });

  it('returns the not found error for the get photo grid endpoint for user who has npt created a grid', async () => {
    const resultSignUp = await request(app).post('/api/signup').send({
      email: 'test@test.com',
      password: '123456712',
      name: 'test',
    });

    const result = await request(app)
      .get('/api/photogrid')
      .set({
        Authorization: `Bearer ${resultSignUp.body.token}`,
      });
    expect(result.statusCode).toEqual(404);
  });

  it('creates a photo grid for a user', async () => {
    const resultSignUp = await request(app).post('/api/signup').send({
      email: 'test@test.com',
      password: '123456712',
      name: 'test',
    });

    const gridData = {
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
    const result = await request(app)
      .post('/api/photogrid')
      .send(gridData)
      .set({
        Authorization: `Bearer ${resultSignUp.body.token}`,
      });

    expect(result.body.grid).toStrictEqual(gridData.grid);
    expect(result.statusCode).toEqual(200);
  });

  it('returns a photo grid for a user', async () => {
    const resultSignUp = await request(app).post('/api/signup').send({
      email: 'test@test.com',
      password: '123456712',
      name: 'test',
    });

    const gridData = {
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
    await request(app)
      .post('/api/photogrid')
      .send(gridData)
      .set({
        Authorization: `Bearer ${resultSignUp.body.token}`,
      });

    const result = await request(app)
      .get('/api/photogrid')
      .set({
        Authorization: `Bearer ${resultSignUp.body.token}`,
      });

    expect(result.body.grid).toStrictEqual(gridData.grid);
    expect(result.statusCode).toEqual(200);
  });
});