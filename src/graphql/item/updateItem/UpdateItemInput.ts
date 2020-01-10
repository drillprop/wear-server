import { InputType, Field } from 'type-graphql';
import { Length, Min, IsUrl } from 'class-validator';
import { IsNameNotTaken } from '../createItem/IsNameNotTaken';

@InputType()
export class EditItemInput {
  @Field()
  id: string;
  @Field({ nullable: true })
  @Length(1, 255)
  @IsNameNotTaken()
  name: string;
  @Field({ nullable: true })
  @Min(1)
  price: number;
  @Field({ nullable: true })
  @IsUrl()
  imageUrl: string;
  @Field({ nullable: true })
  @Length(1, 255)
  category: string;
}
