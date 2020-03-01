import { InputType, Field, Int } from 'type-graphql';
import { SizeSymbol } from '../../entity/Size';

@InputType()
export class ItemSizesInput {
  @Field(() => SizeSymbol)
  sizeSymbol: SizeSymbol;

  @Field(() => Int)
  quantity: number;
}
