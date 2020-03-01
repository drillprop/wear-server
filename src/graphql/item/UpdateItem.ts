import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Item } from '../../entity/Item';
import { EditItemInput } from './updateItem/UpdateItemInput';
import { Size } from '../../entity/Size';

@Resolver()
export default class UpdateItemResolver {
  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Mutation(() => Item)
  async updateItem(@Arg('input') input: EditItemInput) {
    const { id, sizes, ...rest } = input;
    const itemRepository = Item.getRepository();
    try {
      const item = await Item.findOne(id);
      if (!item) throw Error('No such item');

      if (sizes) {
        input.sizes.forEach(inputSize => {
          const sizeToUpdate = item.sizes.find(
            itemSize => inputSize.sizeSymbol === itemSize.sizeSymbol
          );
          if (sizeToUpdate) sizeToUpdate.quantity = inputSize.quantity;
          else {
            const newSize = Size.create(inputSize);
            item.sizes = [...item.sizes, newSize];
          }
        });
      }

      const updatedItem = await itemRepository.save({
        ...item,
        ...rest
      });
      return updatedItem;
    } catch (error) {
      throw Error(error);
    }
  }
}
