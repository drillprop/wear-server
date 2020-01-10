import { ObjectType, Field, InputType, Int } from 'type-graphql';

@ObjectType()
export class SuccessMessage {
  @Field()
  message: string;
}
