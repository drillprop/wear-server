import { Arg, Query, Resolver, ID } from 'type-graphql';
import { Order } from '../../entity/Order';

@Resolver()
export default class OrderResolver {
  @Query(() => Order, { nullable: true })
  async order(@Arg('id', () => ID) id: string) {
    try {
      const order = await Order.findOne(id);
      return order;
    } catch (error) {
      throw Error(error);
    }
  }
}
