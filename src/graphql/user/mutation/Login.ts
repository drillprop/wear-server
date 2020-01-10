import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { Context } from '../../../types/context.types';
import { checkPassword, createUserToken } from '../../../utils/helpers';
import LoginInput from './login/LoginInput';

@Resolver()
export default class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() { res }: Context
  ) {
    try {
      const user = await User.findAndSelectPassword('email', email);
      if (!user) throw Error('No user with this email');

      const match = await checkPassword(password, user.password);
      if (!match) throw Error('Wrong Password');

      const token = createUserToken(user);
      res.cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      });
      return user;
    } catch (error) {
      throw Error(error);
    }
  }
}
