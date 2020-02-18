import { Authorized, Arg, Resolver, Query, ObjectType } from 'type-graphql';
import { User } from '../../entity/User';
import { SearchUserInput } from './users/SearchUserInput';
import SelectAndCount from '../shared/SelectAndCount';

@ObjectType()
class UsersAndCount extends SelectAndCount(User) {}

@Resolver()
export class UsersResolver {
  @Authorized(['ADMIN'])
  @Query(() => UsersAndCount)
  async users(@Arg('input', { nullable: true }) input: SearchUserInput) {
    try {
      let search;
      if (input) search = await User.searchUsers(input);
      else search = await User.findAndCount();
      const [select, count] = search;
      return {
        select,
        count
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
