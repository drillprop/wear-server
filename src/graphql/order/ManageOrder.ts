import { Resolver, Mutation, Authorized, Arg, ID } from 'type-graphql';
import { SuccessMessage } from '../shared/SuccessMessage';
import { OrderStatus, Order } from '../../entity/Order';

@Resolver()
export class ManageOrderResolver {
  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Mutation(() => SuccessMessage)
  async manageOrder(
    @Arg('id', () => ID) id: string,
    @Arg('status', () => OrderStatus) status: OrderStatus
  ) {
    try {
      const order = await Order.findOne(id);
      if (!order) throw Error('No such order');
      order.status = status;
      await order.save();
      return {
        message: 'Succesfully changed order status'
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
