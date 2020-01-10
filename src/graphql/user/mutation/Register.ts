import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { Context } from '../../../types/context.types';
import { createUserToken } from '../../../utils/helpers';
import RegisterInput from './register/RegisterInput';

@Resolver()
export default class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg('input') { email, password }: RegisterInput,
    @Ctx() { res }: Context
  ) {
    try {
      const hashPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        email,
        password: hashPassword
      });
      await user.save();
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
