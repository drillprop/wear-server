import { Authorized, Query, Resolver, Arg } from 'type-graphql';
import { Order } from '../../entity/Order';
import SearchInput from '../shared/SearchInput';

@Resolver()
export default class OrdersResolver {
  @Authorized(['EMPLOYEE', 'ADMIN'])
  @Query(() => [Order], { nullable: 'items' })
  async orders(@Arg('input', { nullable: true }) input: SearchInput) {
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
