import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export default class SearchInput {
  @Field(() => ID, { nullable: true })
  whereId: string;
  @Field(() => Int, { nullable: true })
  take: number;
  @Field(() => Int, { nullable: true })
  skip: number;
  @Field({ nullable: true })
  orderBy: string;
  @Field({ nullable: true })
  desc: boolean;
}
