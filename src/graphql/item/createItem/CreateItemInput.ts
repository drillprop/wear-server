import { Field, InputType } from 'type-graphql';
import { Length, Min, IsUrl } from 'class-validator';
import { IsNameNotTaken } from './IsNameNotTaken';
import { Gender, Category } from '../../../entity/Item';

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
}
