import { Field, InputType } from 'type-graphql';

@InputType()
export default class UpdateAddressInput {
  @Field({ nullable: true })
  addresLine1: string;

  @Field({ nullable: true })
  addresLine2: string;

  @Field({ nullable: true })
  zipCode: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  country: string;
}
