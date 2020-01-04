import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import { config } from './ormconfig';
import { getIdFromToken } from './utils/helpers';

const startServer = async () => {
  const app = express();

  const frontendUrl = process.env.FRONTEND_URL;

  app.use(
    cors({
      credentials: true,
      origin: frontendUrl
    })
  );

  app.use('/graphql', bodyParser.json(), cookieParser());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const id = getIdFromToken(req);
      return { req, res, id };
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
