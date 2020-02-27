import { Arg, Query, Resolver, ID } from 'type-graphql';
import { Item } from '../../entity/Item';

@Resolver()
export default class ItemResolver {
  @Query(() => Item, { nullable: true })
  async item(@Arg('id', () => ID) id: string) {
    try {
      const item = await Item.findOne(id, { relations: ['sizes'] });
      return item;
    } catch (error) {
      throw Error(error);
    }
  }
}
