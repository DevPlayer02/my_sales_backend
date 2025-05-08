import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/modules/**/database/entities/*.{ts, js}'],
  migrations: ['./src/shared/typeorm/migrations/*.{ts, js}'],
});