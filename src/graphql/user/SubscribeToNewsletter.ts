import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { SuccessMessage } from '../shared/SuccessMessage';
import { Context } from '../../types/context.types';
import { User } from '../../entity/User';

@Resolver()
export default class SubscribeToNewsletterResolver {
  @Mutation(() => SuccessMessage)
  async subscribeToNewsletter(
    @Arg('newsletter') newsletter: boolean,
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findOne({
        id: userId
      });
      if (!user) throw Error('You must be logged in');
      user.newsletter = newsletter;
      await user.save();
      return {
        message: 'Successfully signed to newsletter'
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
