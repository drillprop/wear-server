import { InputType, Field } from 'type-graphql';

@InputType()
export class SignInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
