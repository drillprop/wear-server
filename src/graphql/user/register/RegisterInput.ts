import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './RegisterValidator';

@InputType()
export default class RegisterInput {
  @Field()
  @Length(1, 255)
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already in use' })
  email: string;

  @Field()
  @Length(6, 255)
  password: string;
}
