import { Int, Query, Resolver } from 'type-graphql';
import { Item } from '../../entity/Item';

@Resolver()
export default class ItemsCountResolver {
  @Query(() => Int)
  async itemsCount() {
    try {
      const total = await Item.count();
      return total;
    } catch (error) {
      throw Error(error);
    }
  }
}
