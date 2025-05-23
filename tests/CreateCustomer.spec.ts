import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { App } from 'supertest/types';
import appPromise from '@shared/infra/http/server';
import request from 'supertest';

describe('Create User', () => {
  let app: App;

  beforeEach(async () => {
    await AppDataSource.initialize();
    app = (await appPromise) as App;
  });

  afterEach(async () => {
    const entities = AppDataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
    await AppDataSource.destroy();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Jon Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('john@gmail.com');
  });

  it('should be able to create a user with duplicate email', async () => {
    await request(app).post('/users').send({
      name: 'Jon Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    const response = await request(app).post('/users').send({
      name: 'Jon Doe',
      email: 'john@gmail.com',
      password: '654321',
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'Email address already used.');
  });
});
