import users from './users';
import { GraphQLDateTime } from 'graphql-iso-date';

export default {
  Date: GraphQLDateTime,
  Query: { ...users.Query },
  Mutation: { ...users.Mutation }
};
