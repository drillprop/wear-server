import { Arg, Query, Resolver, ObjectType, Field } from 'type-graphql';
import { Item } from '../../entity/Item';
import { SearchItemInput } from './items/SearchItemsInput';
import SelectAndCount from '../shared/SelectAndCount';

@ObjectType()
class ItemsAndCount extends SelectAndCount(Item) {
  @Field({ nullable: true })
  maxPrice: number;
  @Field({ nullable: true })
  minPrice: number;
}

@Resolver()
export default class ItemsResolver {
  @Query(() => ItemsAndCount)
  async items(@Arg('where', { nullable: true }) input: SearchItemInput) {
    try {
      const maxPrice = await Item.getMaxPrice(input);
      if (input) {
        const [select, count] = await Item.searchItems(input);
        return { select, count, ...maxPrice };
      } else {
        const [select, count] = await Item.findAndCount();
        return { select, count, ...maxPrice };
      }
    } catch (error) {
      throw Error(error);
    }
  }
}
