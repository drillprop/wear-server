import bcrypt from 'bcrypt';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserRole } from '../../entity/User';
import { Context } from '../../types/context.types';
import { checkPassword, createUserToken } from '../../utils/helpers';
import { SuccessMessage } from '../sharedTypeDefs';
import { ContactDetailsInput, SearchUserInput, SignInput } from './user.inputs';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { MoreThan, LessThan } from 'typeorm';

@Resolver()
export default class UserResolver {
  @Authorized('ADMIN')
  @Query(() => [User], { nullable: 'items' })
  async users(@Arg('input', { nullable: true }) input: SearchUserInput) {
    try {
      if (!input) {
        const allUsers = await User.find();
        return allUsers;
      }
      const users = await User.searchUsers(input);
      return users;
    } catch (error) {
      throw Error(error);
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: Context) {
    const user = await User.findOne({ id: userId });
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

  @Mutation(() => SuccessMessage)
  signout(@Ctx() { res }: Context) {
    res.clearCookie('token');
    return { message: 'Successfully sign out' };
  }

  @Authorized(['ADMIN', 'EMPLOYEE', 'CUSTOMER'])
  @Mutation(() => User)
  async updateContactDetails(
    @Arg('input') input: ContactDetailsInput,
    @Ctx() { userId }: Context
  ) {
    const userRepository = User.getRepository();
    try {
      const user = await User.findOne({ id: userId });
      const updatedUser = await userRepository.save({ ...user, ...input });
      return updatedUser;
    } catch (error) {
      throw Error(error);
    }
  }

  @Authorized('ADMIN')
  @Mutation(() => SuccessMessage)
  async changeUserRole(
    @Arg('email') email: string,
    @Arg('role', () => UserRole) role: UserRole
  ) {
    try {
      const user = await User.findAndSelectPassword('email', email);
      if (!user) throw Error('No user with this email');

      user.role = role;
      await user.save();

      return {
        message: `Succesfully set ${role} permission to ${email}`
      };
    } catch (error) {
      throw Error(error);
    }
  }

  @Mutation(() => SuccessMessage)
  async changePassword(
    @Arg('password') password: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { userId, res }: Context
  ) {
    try {
      const user = await User.findAndSelectPassword('id', userId);
      if (!user) throw Error('You must be logged in');

      console.log(password, user.password);
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

  @Mutation(() => SuccessMessage)
  async requestResetPassword(@Arg('email') email: string) {
    const user = await User.findOne({ email });
    if (!user) throw Error('No user with this email');

    const resetToken = (await promisify(randomBytes)(20)).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    const link = `${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`;
    console.log(link);

    return {
      message: 'Successfully send reset password link'
    };
  }

  @Mutation(() => User)
  async resetPassword(
    @Arg('password') password: string,
    @Arg('resetToken') resetToken: string,
    @Ctx() { res }: Context
  ) {
    const now = new Date(Date.now());
    const user = await User.findOne({
      where: {
        resetToken,
        resetTokenExpiry: MoreThan(now)
      }
    });
    if (!user) throw new Error('This token is either invalid or expired');

    const newPassword = await bcrypt.hash(password, 12);

    user.password = newPassword;
    user.resetToken = '';
    user.resetTokenExpiry = new Date(0);
    await user.save();
    const token = createUserToken(user);
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });
    return user;
  }
}
