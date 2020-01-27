import { Length, IsPhoneNumber } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export default class PersonalInfoInput {
  @Field({ nullable: true })
  @Length(1, 255)
  firstName: string;

  @Field({ nullable: true })
  @Length(1, 255)
  lastName: string;

  @Field({ nullable: true })
  @IsPhoneNumber('PL')
  phoneNumber: string;
}
