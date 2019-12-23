import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { server } from './server';

const startServer = async () => {
  const connection = await createConnection();
  await connection.runMigrations();
  server.listen(4000, () => {
    console.log('server started');
  });
};

startServer();
