import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { Context } from '../../../types/context.types';
import { checkPassword } from '../../../utils/helpers';
import { SuccessMessage } from '../../sharedTypeDefs';

@Resolver()
export default class DeleteAccountResolver {
  @Mutation(() => SuccessMessage)
  async deleteAccount(
    @Arg('password') password: string,
    @Ctx() { userId, res }: Context
  ) {
    const user = await User.findOne({ id: userId });
    if (!user) throw Error('You must be logged in');

    const match = await checkPassword(password, user.password);
    if (!match) throw Error('Wrong Password');

    await User.delete(userId);
    res.clearCookie('token');
    return {
      message: 'Successfully deleted account'
    };
  }
}
