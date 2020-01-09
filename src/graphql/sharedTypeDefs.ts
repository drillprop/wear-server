import { ObjectType, Field, InputType, Int } from 'type-graphql';

@ObjectType()
export class SuccessMessage {
  @Field()
  message: string;
}

@InputType()
export class SearchInput {
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
