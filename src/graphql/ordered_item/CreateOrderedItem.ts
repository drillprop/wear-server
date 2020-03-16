import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql';
import { Ordered_Item } from '../../entity/Ordered_Item';
import { Context } from '../../types/context.types';
import { SizeSymbol } from '../../entity/Size';
import { User } from '../../entity/User';
import { Item } from '../../entity/Item';

@Resolver()
export default class CreateOrderedItemResolver {
  @Mutation(() => Ordered_Item)
  async createOrderedItem(
    @Arg('itemId', () => ID) itemId: string,
    @Arg('size', () => SizeSymbol) size: SizeSymbol,
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findOne({ id: userId });
      const item = await Item.findOne({ id: itemId });
      if (!user) throw Error('You have to log in');
      if (!item) throw Error("Item doesn't exists");
      const orderedItem = new Ordered_Item();
      orderedItem.sizeSymbol = size;
      orderedItem.item = item;
      await orderedItem.save();
      return orderedItem;
    } catch (error) {
      throw Error(error);
    }
  }
}
