import { buildSchema } from 'type-graphql';
import { customAuthChecker } from './utils/customAuthChecker';

export default () =>
  buildSchema({
    resolvers: [__dirname + '/graphql/**/*.ts'],
    authChecker: customAuthChecker
  });
