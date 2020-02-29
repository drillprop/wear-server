import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';
import createSchema from './createSchema';
import ormConfig from './ormconfig';
import { getIdFromToken } from './utils/getAndCreatetoken';

const startServer = async () => {
  try {
    const connection = await createConnection(ormConfig);
    await connection.runMigrations();

    const schema = await createSchema();

    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => {
        const userId = getIdFromToken(req);
        return { req, res, userId };
      },
      introspection: true,
      playground: true
    });

    server.applyMiddleware({ app, cors: false });

    app.listen(process.env.PORT || 4000, () => {
      console.log('server started');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
