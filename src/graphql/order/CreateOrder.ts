import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql';
import { Order } from '../../entity/Order';
import { Ordered_Item } from '../../entity/Ordered_Item';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';

@Resolver()
export default class CreateOrderResolver {
  @Mutation(() => Order)
  async createOrder(
    @Arg('input', () => [ID]) input: string[],
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findOne({ id: userId });
      const orderedItems = await Ordered_Item.findByIds(input);
      if (!user) throw Error('You have to log in');
      if (!orderedItems.length) throw Error("You didn't provide any items");
      const order = new Order();
      order.orderedBy = Promise.resolve(user);
      order.orderedItems = orderedItems;
      await order.save();
      return order;
    } catch (error) {
      throw Error(error);
    }
  }
}
