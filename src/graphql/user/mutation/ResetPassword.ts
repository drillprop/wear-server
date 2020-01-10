import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { MoreThan } from 'typeorm';
import { promisify } from 'util';
import { User } from '../../../entity/User';
import { Context } from '../../../types/context.types';
import { createUserToken } from '../../../utils/helpers';
import { emailTemplate, transport } from '../../../utils/mail';
import { SuccessMessage } from '../../shared/sharedTypeDefs';

@Resolver()
export default class ResetPasswordResolver {
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

    await transport.sendMail({
      from: 'wear@wear.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: emailTemplate(link)
    });

    return {
      message: `Successfully send reset password link to ${user.email}`
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
