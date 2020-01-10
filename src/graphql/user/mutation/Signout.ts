import { Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../../types/context.types';
import { SuccessMessage } from '../../shared/sharedTypeDefs';

@Resolver()
export default class SignoutResolver {
  @Mutation(() => SuccessMessage)
  signout(@Ctx() { res }: Context) {
    res.clearCookie('token');
    return { message: 'Successfully sign out' };
  }
}
