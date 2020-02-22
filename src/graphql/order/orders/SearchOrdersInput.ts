import { InputType, Field } from 'type-graphql';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../../entity/Order';
import SearchInput from '../../shared/SearchInput';

@InputType()
export default class SearchOrdersInput extends SearchInput {
  @Field(() => OrderStatus, { nullable: true })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
