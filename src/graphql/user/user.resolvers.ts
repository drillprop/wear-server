import bcrypt from 'bcrypt';
import { User, UserRole } from '../../entity/User';
import { createUserToken, checkPassword } from '../../utils/helpers';
import { Resolver, Mutation, Ctx, Arg, Query, Authorized } from 'type-graphql';
import { Context } from '../../types/context.types';
import SuccessMessage from '../sharedTypeDefs';
import { SignInput } from './user.inputs';

@Resolver()
export default class UserResolver {
  @Authorized('ADMIN')
  @Query(() => [User], { nullable: 'items' })
  async users() {
    try {
      const allUsers = await User.find();
      return allUsers;
    } catch (error) {
      throw Error(error);
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: Context) {
    const user = await User.findById(userId);
    if (user) {
      return user;
    }
    return null;
  }

  @Mutation(() => User)
  async register(
    @Arg('input') { email, password }: SignInput,
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

  @Mutation(() => User)
  async login(
    @Arg('input') { email, password }: SignInput,
    @Ctx() { res }: Context
  ) {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        throw Error('No user with this email');
      }
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

  @Mutation(() => SuccessMessage)
  signout(@Ctx() { res }: Context) {
    res.clearCookie('token');
    return { message: 'Successfully sign out' };
  }

  @Authorized('ADMIN')
  @Mutation(() => SuccessMessage)
  async changeUserRole(
    @Arg('email') email: string,
    @Arg('role') role: UserRole
  ) {
    try {
      const user = await User.findByEmail(email);
      if (user) {
        user.role = role;
        await user.save();
      } else {
        throw Error('No user with this email');
      }
      return {
        message: `Succesfully set ${role} permission to ${email}`
      };
    } catch (error) {
      throw Error(error);
    }
  }

  @Mutation(() => SuccessMessage)
  async deleteAccount(
    @Arg('password') password: string,
    @Ctx() { userId, res }: Context
  ) {
    const user = await User.findById(userId);
    if (!user) {
      throw Error('You must be logged in');
    }
    const match = await checkPassword(password, user.password);
    if (!match) {
      throw Error('Wrong Password');
    }
    await User.delete(userId);
    res.clearCookie('token');
    return {
      message: 'Successfully deleted account'
    };
  }
}
