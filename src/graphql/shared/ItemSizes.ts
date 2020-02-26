import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class ItemSizes {
  @Field(() => Int, { nullable: true })
  xs: number;

  @Field(() => Int, { nullable: true })
  s: number;

  @Field(() => Int, { nullable: true })
  m: number;

  @Field(() => Int, { nullable: true })
  l: number;

  @Field(() => Int, { nullable: true })
  xl: number;

  @Field(() => Int, { nullable: true })
  xxl: number;
}
