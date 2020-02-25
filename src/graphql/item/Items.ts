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
      let search;
      if (input) search = await Item.searchItems(input);
      else search = await Item.findAndCount();
      const [select, count] = search;
      const { minPrice, maxPrice } = await Item.getMinAndMaxPrice();
      return {
        select,
        count,
        minPrice,
        maxPrice
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
