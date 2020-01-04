import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import { config } from './ormconfig';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

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
    context: ({ req, res }) => ({ req, res })
  });

  server.applyMiddleware({ app, cors: false });

  const connection = await createConnection(config);
  await connection.runMigrations();

  app.listen(process.env.PORT || 4000, () => {
    console.log('server started');
  });
};

startServer();
