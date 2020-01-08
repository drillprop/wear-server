import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class SuccessMessage {
  @Field()
  message: string;
}
