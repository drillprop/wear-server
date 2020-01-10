import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Item } from '../../../entity/Item';
import { SuccessMessage } from '../../shared/sharedTypeDefs';

@Resolver()
export default class DeleteItemResolver {
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
