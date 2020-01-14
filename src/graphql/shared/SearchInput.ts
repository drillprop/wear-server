import { InputType, Field, Int, ID } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export default class SearchInput {
  @Field(() => ID, { nullable: true })
  whereId: string;
  @Field({ nullable: true })
  @Length(1, 255)
  column: string;
  @Field({ nullable: true })
  @Length(1, 255)
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
