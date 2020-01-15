import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql';
import { Order } from '../../entity/Order';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import { SuccessMessage } from '../shared/SuccessMessage';

@Resolver()
export default class DeleteOrderResolver {
  @Mutation(() => SuccessMessage)
  async deleteOrder(
    @Arg('id', () => ID) id: string,
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findOne(userId);
      if (!user) throw Error('You need to login');

      const order = await Order.findOne(id);
      if (!order) throw Error('No such order');

      if (user.role === 'CUSTOMER') {
        const orderedById = await order.orderedBy.then(
          orderedBy => orderedBy.id
        );
        // prevent from deleting someone's order
        if (orderedById !== user.id) throw Error('No such order');
        await Order.delete(id);
      }

      await Order.delete(id);
      return {
        message: 'Order deleted'
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
