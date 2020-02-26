import { IsUrl, Length, MaxLength, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Category, Gender } from '../../../entity/Item';
import { IsNameNotTaken } from './IsNameNotTaken';
import { ItemSizes } from '../../shared/ItemSizes';

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

  @Field(() => Category)
  category: Category;

  @Field(() => Gender)
  gender: Gender;

  @Field({ nullable: true })
  @MaxLength(255)
  description: string;

  @Field(() => ItemSizes, { nullable: true })
  sizes: ItemSizes;
}
