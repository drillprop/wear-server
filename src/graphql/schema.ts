import { makeExecutableSchema } from 'apollo-server-express';
import itemTypeDefs from './item/item.typeDefs';
import userTypeDefs from './user/user.typeDefs';
import sharedTypeDefs from './shared/shared.typeDefs';
import userResolvers from './user/user.resolvers';
import itemResolvers from './item/item.resolvers';
import merge from 'lodash.merge';

export default makeExecutableSchema({
  typeDefs: [itemTypeDefs, userTypeDefs, sharedTypeDefs],
  resolvers: merge(userResolvers, itemResolvers)
});
