import { Arg, Query, Resolver, ObjectType } from 'type-graphql';
import { Item } from '../../entity/Item';
import { SearchItemInput } from './items/SearchItemsInput';
import SelectAndCount from '../shared/SelectAndCount';

@ObjectType()
class ItemsAndCount extends SelectAndCount(Item) {}

@Resolver()
export default class ItemsResolver {
  @Query(() => ItemsAndCount)
  async items(@Arg('input', { nullable: true }) input: SearchItemInput) {
    try {
      let search;
      if (input) search = await Item.searchItems(input);
      else search = await Item.findAndCount();
      const [select, count] = search;
      return {
        select,
        count
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
