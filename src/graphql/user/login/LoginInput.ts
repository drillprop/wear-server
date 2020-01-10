import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class LoginInput {
  @Field()
  @Length(1, 255)
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 255)
  password: string;
}
