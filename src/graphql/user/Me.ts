import { Query, Resolver, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: Context) {
    const user = await User.findOne({ id: userId });
    if (user) {
      return user;
    }
    return null;
  }
}
