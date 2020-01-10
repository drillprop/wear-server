import { Field, InputType } from 'type-graphql';
import { Length, Min, IsUrl } from 'class-validator';
import { IsNameNotTaken } from './IsNameNotTaken';

@InputType()
export class CreateItemInput {
  @Field()
  @Length(1, 255)
  @IsNameNotTaken()
  name: string;
  @Field()
  @Min(1)
  price: number;
  @Field()
  @IsUrl()
  imageUrl: string;
  @Field()
  @Length(1, 255)
  category: string;
}
