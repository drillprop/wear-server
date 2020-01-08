import { Arg, Ctx, Mutation, Resolver, Query } from 'type-graphql';
import { Item } from '../../entity/Item';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import SuccessMessage from '../sharedTypeDefs';
import { CreateItemInput, SearchItemInput } from './item.inputs';

@Resolver()
export default class ItemResolver {
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
      const item = Item.create({ ...input, user });
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
}
