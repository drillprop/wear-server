import { Arg, Query, Resolver } from 'type-graphql';
import { Item } from '../../entity/Item';
import { SearchItemInput } from './items/SearchItemsInput';

@Resolver()
export default class ItemsResolver {
  @Query(() => [Item], { nullable: 'items' })
  async items(@Arg('input', { nullable: true }) input: SearchItemInput) {
    try {
      if (input) {
        const search = await Item.searchItems(input);
        return search;
      }
      const items = await Item.find();
      return items;
    } catch (error) {
      throw Error(error);
    }
  }
}
