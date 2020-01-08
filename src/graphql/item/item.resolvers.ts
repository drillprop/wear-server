import { Arg, Ctx, Mutation, Resolver, Query } from 'type-graphql';
import { CreateItemInput, Item, SearchItemInput } from '../../entity/Item';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import SuccessMessage from '../sharedTypeDefs';

@Resolver()
export default class ItemResolver {
  @Mutation(() => Item)
  async createItem(
    @Arg('input') input: CreateItemInput,
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw Error('You have to login to add an item');
      }
      if (user.role === 'CUSTOMER') {
        throw Error(`You don't have permission to create an item`);
      }
      const { name, imageUrl, price, category } = input;
      const item = Item.create({ ...input });
      await item.save();
      return item;
    } catch (error) {
      throw Error(error);
    }
  }
  @Mutation(() => SuccessMessage)
  async deleteItem(@Arg('id') id: string, @Ctx() { userId }: Context) {
    const user = await User.findById(userId);
    if (!user) {
      throw Error('You must be logged in');
    }
    if (user.role === 'CUSTOMER') {
      throw Error(`You don't have permission to delete an item`);
    }
    await Item.delete(id);
    return {
      message: 'Successfully deleted item'
    };
  }
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

const itemResolvers = {
  Mutation: {
    // ,
    // Query: {
  }
};
