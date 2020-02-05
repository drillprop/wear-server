import { Arg, Query, Resolver, ID } from 'type-graphql';
import { Item } from '../../entity/Item';

@Resolver()
export default class ItemResolver {
  @Query(() => Item, { nullable: true })
  async item(@Arg('id', () => ID) id: string) {
    try {
      if (id) {
        const search = await Item.findOne(id);
        return search;
      }
      const items = await Item.find();
      return items;
    } catch (error) {
      throw Error(error);
    }
  }
}
