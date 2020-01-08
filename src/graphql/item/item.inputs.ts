import { InputType, Field, Int } from 'type-graphql';

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
export class SearchItemInput {
  @Field({ nullable: true })
  column: string;
  @Field({ nullable: true })
  argument: string;
  @Field(() => Int, { nullable: true })
  take: number;
  @Field(() => Int, { nullable: true })
  skip: number;
  @Field({ nullable: true })
  orderBy: string;
  @Field({ nullable: true })
  desc: boolean;
  @Field({ nullable: true })
  priceFrom: number;
  @Field({ nullable: true })
  priceTo: number;
}
