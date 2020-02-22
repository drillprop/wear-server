import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export default class SearchInput {
  @Field(() => ID, { nullable: true })
  whereId: string;

  @Field(() => Int, { defaultValue: 5 })
  take: number;

  @Field(() => Int, { defaultValue: 0 })
  skip: number;

  @Field({ nullable: true })
  orderBy: string;

  @Field({ nullable: true })
  desc: boolean;
}
