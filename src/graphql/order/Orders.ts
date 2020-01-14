import { Authorized, Query, Resolver } from 'type-graphql';
import { Order } from '../../entity/Order';

@Resolver()
export default class OrdersResolver {
  @Authorized(['EMPLOYEE', 'ADMIN'])
  @Query(() => [Order], { nullable: 'items' })
  async orders() {
    try {
      const orders = await Order.find();
      return orders;
    } catch (error) {
      throw Error(error);
    }
  }
}
