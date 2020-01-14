import { Arg, Ctx, Mutation, Resolver, ID } from 'type-graphql';
import { Item } from '../../entity/Item';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import { Order } from '../../entity/Order';

@Resolver()
export default class CreateOrderResolver {
  @Mutation(() => Order)
  async createOrder(
    @Arg('input', () => [ID]) input: string[],
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findOne({ id: userId });
      const items = await Item.findByIds(input);
      if (!user) throw Error('You have to log in');
      if (!items.length) throw Error("You didn't provide any items");
      const order = new Order();
      order.user = user;
      order.orderedItems = Promise.resolve(items);
      await order.save();
      return order;
    } catch (error) {
      throw Error(error);
    }
  }
}
