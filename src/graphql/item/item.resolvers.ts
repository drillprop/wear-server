import { Arg, Ctx, Mutation, Resolver, Query, Authorized } from 'type-graphql';
import { Item } from '../../entity/Item';
import { User, UserRole } from '../../entity/User';
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

  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Mutation(() => Item)
  async createItem(
    @Arg('input') input: CreateItemInput,
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findById(userId);
      const item = Item.create({ ...input, user });
      await item.save();
      return item;
    } catch (error) {
      throw Error(error);
    }
  }

  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Mutation(() => SuccessMessage)
  async deleteItem(@Arg('id') id: string) {
    try {
      const item = await Item.findByIds([id]);
      if (!item.length) throw Error('No such item');
      await Item.delete(id);
      return {
        message: 'Successfully deleted item'
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
