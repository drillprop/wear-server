import { ApolloServer } from 'apollo-server';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req
});
