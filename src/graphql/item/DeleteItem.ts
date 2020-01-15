import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Item } from '../../entity/Item';
import { SuccessMessage } from '../shared/SuccessMessage';

@Resolver()
export default class DeleteItemResolver {
  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Mutation(() => SuccessMessage)
  async deleteItem(@Arg('id') id: string) {
    try {
      const item = await Item.findOne(id);
      if (!item) throw Error('No such item');
      await Item.delete(id);
      return {
        message: 'Successfully deleted item'
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
