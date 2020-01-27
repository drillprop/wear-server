import { Field, InputType } from 'type-graphql';

@InputType()
export default class UpdateAddressInput {
  @Field({ nullable: true })
  addressLine1: string;

  @Field({ nullable: true })
  addressLine2: string;

  @Field({ nullable: true })
  zipCode: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  country: string;
}
