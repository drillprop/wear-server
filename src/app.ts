import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { server } from './server';
import { config } from './ormconfig';

const startServer = async () => {
  const connection = await createConnection(config);
  await connection.runMigrations();
  server.listen(process.env.PORT || 4000, () => {
    console.log('server started');
  });
};

startServer();
