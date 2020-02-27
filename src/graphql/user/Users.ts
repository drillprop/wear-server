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
  async users(@Arg('where', { nullable: true }) input: SearchUserInput) {
    try {
      if (input) {
        const [select, count] = await User.searchUsers(input);
        return { select, count };
      } else {
        const [select, count] = await User.findAndCount();
        return { select, count };
      }
    } catch (error) {
      throw Error(error);
    }
  }
}
