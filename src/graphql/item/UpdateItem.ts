import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Item } from '../../entity/Item';
import { EditItemInput } from './updateItem/UpdateItemInput';

@Resolver()
export default class UpdateItemResolver {
  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Mutation(() => Item)
  async updateItem(@Arg('input') input: EditItemInput) {
    const { id, ...rest } = input;
    const itemRepository = Item.getRepository();
    try {
      const item = await Item.findOne(id);
      if (!item) throw Error('No such item');
      const updateItem = await itemRepository.save({ ...item, ...rest });
      return updateItem;
    } catch (error) {
      throw Error(error);
    }
  }
}
