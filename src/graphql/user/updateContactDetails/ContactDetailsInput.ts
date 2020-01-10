import { Length } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export default class ContactDetailsInput {
  @Field({ nullable: true })
  @Length(1, 255)
  firstName: string;

  @Field({ nullable: true })
  @Length(1, 255)
  lastName: string;

  @Field({ nullable: true })
  @Length(1, 255)
  address: string;

  @Field(() => Int, { nullable: true })
  @Length(7, 255)
  phoneNumber: number;
}
