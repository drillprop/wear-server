import { Authorized, Arg, Resolver, Query } from 'type-graphql';
import { User } from '../../entity/User';
import { SearchUserInput } from './users/SearchInput';

@Resolver()
export class UsersResolver {
  @Authorized('ADMIN')
  @Query(() => [User], { nullable: 'items' })
  async users(@Arg('input', { nullable: true }) input: SearchUserInput) {
    try {
      if (!input) {
        const allUsers = await User.find();
        return allUsers;
      }
      const users = await User.searchUsers(input);
      return users;
    } catch (error) {
      throw Error(error);
    }
  }
}
