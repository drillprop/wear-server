import { Authorized, Int, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export class UsersCountResolver {
  @Authorized('ADMIN')
  @Query(() => Int)
  async usersCount() {
    try {
      const total = await User.count();
      return total;
    } catch (error) {
      throw Error(error);
    }
  }
}
