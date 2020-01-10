import { Field, InputType } from 'type-graphql';
import { SearchInput } from '../shared/sharedTypeDefs';

@InputType()
export class CreateItemInput {
  @Field()
  name: string;
  @Field()
  price: number;
  @Field()
  imageUrl: string;
  @Field()
  category: string;
}

@InputType()
export class EditItemInput {
  @Field()
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  price: number;
  @Field({ nullable: true })
  imageUrl: string;
  @Field({ nullable: true })
  category: string;
}

@InputType()
export class SearchItemInput extends SearchInput {
  @Field({ nullable: true })
  priceFrom: number;
  @Field({ nullable: true })
  priceTo: number;
}
