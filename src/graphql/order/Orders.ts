import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Order } from '../../entity/Order';
import SearchOrdersInput from './orders/SearchOrdersInput';

@Resolver()
export default class OrdersResolver {
  @Authorized(['EMPLOYEE', 'ADMIN'])
  @Query(() => [Order], { nullable: 'items' })
  async orders(@Arg('where', { nullable: true }) input: SearchOrdersInput) {
    try {
      if (input) {
        const search = await Order.searchOrders(input);
        return search;
      }
      const orders = await Order.find();
      return orders;
    } catch (error) {
      throw Error(error);
    }
  }
}
