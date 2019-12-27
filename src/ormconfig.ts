import { ConnectionOptions } from 'typeorm';

const devConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  synchronize: true
};

const prodConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: ['src/entity/**/*.ts'],
  synchronize: false
};

export const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;