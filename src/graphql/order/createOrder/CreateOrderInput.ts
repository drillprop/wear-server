import { InputType, Field, ID } from 'type-graphql';
import { SizeSymbol } from '../../../entity/Size';
import { IsEnum } from 'class-validator';

@InputType()
export default class CreateOrderInput {
  @Field(() => ID)
  itemId: string;

  @Field(() => SizeSymbol)
  @IsEnum(SizeSymbol)
  size: SizeSymbol;
}
