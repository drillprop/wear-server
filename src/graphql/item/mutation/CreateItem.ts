import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Item } from '../../../entity/Item';
import { User } from '../../../entity/User';
import { Context } from '../../../types/context.types';
import { CreateItemInput } from '../item.inputs';

@Resolver()
export default class CrateItemResolver {
  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Mutation(() => Item)
  async createItem(
    @Arg('input') input: CreateItemInput,
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findOne({ id: userId });
      const item = Item.create({ ...input, user });
      await item.save();
      return item;
    } catch (error) {
      throw Error(error);
    }
  }
}
