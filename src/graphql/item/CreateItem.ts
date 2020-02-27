import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Item } from '../../entity/Item';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import { CreateItemInput } from './createItem/CreateItemInput';

@Resolver()
export default class CrateItemResolver {
  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Mutation(() => Item)
  async createItem(
    @Arg('input') input: CreateItemInput,
    @Ctx() { userId }: Context
  ) {
    try {
      const { sizes, ...rest } = input;
      const user = await User.findOne({ id: userId });
      if (!user) throw Error('Something went wrong');

      const item = Item.create({ ...rest, sizes: { ...sizes } });
      item.createdBy = Promise.resolve(user);

      await item.save();
      return item;
    } catch (error) {
      throw Error(error);
    }
  }
}
