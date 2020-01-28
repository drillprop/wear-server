import { ArgsType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@ArgsType()
export default class ChangePasswordArgs {
  @Field()
  password: string;

  @Field()
  @Length(6, 255)
  newPassword: string;

  @Field()
  confirmPassword: string;
}
