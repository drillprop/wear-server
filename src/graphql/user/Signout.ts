import { Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../types/context.types';
import { SuccessMessage } from '../shared/SuccessMessage';

@Resolver()
export default class SignoutResolver {
  @Mutation(() => SuccessMessage)
  signout(@Ctx() { res }: Context) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    return { message: 'Successfully sign out' };
  }
}
