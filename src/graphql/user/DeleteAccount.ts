import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import { SuccessMessage } from '../shared/SuccessMessage';
import checkPassword from '../../utils/checkPassword';

@Resolver()
export default class DeleteAccountResolver {
  @Mutation(() => SuccessMessage)
  async deleteAccount(
    @Arg('password') password: string,
    @Ctx() { userId, res }: Context
  ) {
    const user = await User.findAndSelectPassword('id', userId);
    if (!user) throw Error('You must be logged in');

    const match = await checkPassword(password, user.password);
    if (!match) throw Error('Wrong Password');

    await User.delete(userId);
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    return {
      message: 'Successfully deleted account',
    };
  }
}
