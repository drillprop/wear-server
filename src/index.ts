import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { config } from './ormconfig';
import { customAuthChecker } from './utils/customAuthChecker';
import { getIdFromToken } from './utils/getAndCreatetoken';

const startServer = async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [__dirname + '/graphql/**/*.ts'],
    authChecker: customAuthChecker
  });

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
  );

  app.use('/graphql', bodyParser.json(), cookieParser());

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      const userId = getIdFromToken(req);
      return { req, res, userId };
    }
  });

  server.applyMiddleware({ app, cors: false });

  const connection = await createConnection(config);
  await connection.runMigrations();

  app.listen(process.env.PORT || 4000, () => {
    console.log('server started');
  });
};

startServer();
