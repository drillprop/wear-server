import { buildSchema } from 'type-graphql';
import { customAuthChecker } from './utils/customAuthChecker';

export default () =>
  buildSchema({
    resolvers:
      process.env.NODE_ENV === 'production'
        ? [__dirname + '/graphql/**/*.js']
        : [__dirname + '/graphql/**/*.ts'],
    authChecker: customAuthChecker
  });
