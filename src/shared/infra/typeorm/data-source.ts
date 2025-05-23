import 'reflect-metadata';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

const baseDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./src/modules/**/infra/database/entities/*.{ts, js}'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.{ts, js}'],
};

const appTestDataSourceOptions: DataSourceOptions = {
  ...baseDataSourceOptions,
  database: process.env.DB_NAME_TEST,
};

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? appTestDataSourceOptions
    : baseDataSourceOptions,
);
