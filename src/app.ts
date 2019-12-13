import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000, () => {
  console.log('server started');
});
