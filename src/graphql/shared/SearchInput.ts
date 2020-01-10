import { InputType, Field, Int } from 'type-graphql';

@InputType()
export default class SearchInput {
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
}
