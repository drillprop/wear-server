import { Arg, Authorized, ID, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver()
export default class UserResolver {
  @Authorized(['ADMIN'])
  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => ID) id: string) {
    try {
      const user = await User.findOne(id);
      return user;
    } catch (error) {
      throw Error(error);
    }
  }
}
