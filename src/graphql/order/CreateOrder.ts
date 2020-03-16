import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Item } from '../../entity/Item';
import { Order } from '../../entity/Order';
import { Ordered_Item } from '../../entity/Ordered_Item';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import CreateOrderInput from './createOrder/CreateOrderInput';

@Resolver()
export default class CreateOrderResolver {
  @Mutation(() => Order)
  async createOrder(
    @Arg('input', () => CreateOrderInput) input: [CreateOrderInput],
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) throw Error('You have to log in');

      const orderedItemsPromises = input.map(async input => {
        const item = await Item.findOne(input.itemId);
        if (!item) throw Error("Item doesn't exists");
        const itemSize = item.sizes.find(
          item => item.sizeSymbol === input.size && item.quantity > 0
        );
        if (!itemSize) throw Error("Item with this size doesn't exists");
        itemSize.quantity = itemSize.quantity - 1;
        await item.save();
        const orderedItem = new Ordered_Item();
        orderedItem.sizeSymbol = input.size;
        orderedItem.item = item;
        await orderedItem.save();
        return orderedItem;
      });

      const orderedItems = await Promise.all(orderedItemsPromises);

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
