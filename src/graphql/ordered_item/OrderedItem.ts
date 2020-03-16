import { Arg, Query, Resolver, ID } from 'type-graphql';
import { Ordered_Item } from '../../entity/Ordered_Item';

@Resolver()
export default class OrderedItemResolver {
  @Query(() => Ordered_Item, { nullable: true })
  async orderedItem(@Arg('id', () => ID) id: string) {
    try {
      const orderedItem = await Ordered_Item.findOne(id);
      return orderedItem;
    } catch (error) {
      throw Error(error);
    }
  }
}
