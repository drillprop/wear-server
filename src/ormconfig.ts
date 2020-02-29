import { ConnectionOptions } from 'typeorm';

const devConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  synchronize: true,
  logging: true
};

const prodConfig: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: ['build/entity/**/*.js'],
  synchronize: false
};

export = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
