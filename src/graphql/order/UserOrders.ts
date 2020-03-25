import { Query, Resolver, Ctx, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import { Order } from '../../entity/Order';

@Resolver()
export class UserOrders {
  @Query(() => [Order], { nullable: true })
  async userOrders(
    @Arg('take', { defaultValue: 5 }) take: number,
    @Arg('skip') skip: number,
    @Ctx() { userId }: Context
  ) {
    const user = await User.findOne({ id: userId });
    if (!user) throw Error('You must be logged in');
    const orders = await Order.find({
      where: `ordered_by = '${user.id}'`,
      take,
      skip
    });
    return orders;
  }
}
