import bcrypt from 'bcrypt';
import { Args, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import { SuccessMessage } from '../shared/SuccessMessage';
import ChangePasswordArgs from './changePassword/ChangePasswordArgs';
import checkPassword from '../../utils/checkPassword';

@Resolver()
export default class ChangePasswordResolver {
  @Mutation(() => SuccessMessage)
  async changePassword(
    @Args() { password, newPassword, confirmPassword }: ChangePasswordArgs,
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findAndSelectPassword('id', userId);
      if (!user) throw Error('You must be logged in');

      if (newPassword !== confirmPassword) throw Error(`Password don't match`);

      const match = await checkPassword(password, user.password);
      if (!match) throw Error('Wrong Password');

      const hashPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashPassword;
      await user.save();

      return {
        message: 'Successfully changed password'
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
