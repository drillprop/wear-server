import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailNotTaken } from './IsEmailNotTaken';

@InputType()
export default class RegisterInput {
  @Field()
  @Length(1, 255)
  @IsEmail()
  @IsEmailNotTaken({ message: 'Email already in use' })
  email: string;

  @Field()
  @Length(6, 255)
  password: string;
}
