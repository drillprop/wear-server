import { Int, Query, Resolver, Authorized } from 'type-graphql';
import { Order } from '../../entity/Order';

@Resolver()
export default class OrdersCountResolver {
  @Authorized(['ADMIN', 'EMPLOYEE'])
  @Query(() => Int)
  async ordersCount() {
    try {
      const total = await Order.count();
      return total;
    } catch (error) {
      throw Error(error);
    }
  }
}
