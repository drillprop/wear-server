import { Arg, Ctx, ObjectType, Query, Resolver } from 'type-graphql';
import { Order } from '../../entity/Order';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import SelectAndCount from '../shared/SelectAndCount';

@ObjectType()
class UserOrdersAndCount extends SelectAndCount(Order) {}

@Resolver()
export class UserOrders {
  @Query(() => UserOrdersAndCount, { nullable: true })
  async userOrders(
    @Arg('take', { defaultValue: 5 }) take: number,
    @Arg('skip') skip: number,
    @Ctx() { userId }: Context
  ) {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) throw Error('You must be logged in');
      const [select, count] = await Order.findAndCount({
        where: `ordered_by = '${user.id}'`,
        take,
        skip
      });
      return { select, count };
    } catch (error) {
      throw Error(error);
    }
  }
}
