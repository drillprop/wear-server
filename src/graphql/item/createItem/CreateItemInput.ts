import { Field, InputType, Int } from 'type-graphql';
import { Length, Min, IsUrl, MaxLength } from 'class-validator';
import { IsNameNotTaken } from './IsNameNotTaken';
import { Gender, Category } from '../../../entity/Item';

@InputType()
export class ItemSizes {
  @Field(() => Int, { nullable: true })
  xs: number;

  @Field(() => Int, { nullable: true })
  s: number;

  @Field(() => Int, { nullable: true })
  m: number;

  @Field(() => Int, { nullable: true })
  l: number;

  @Field(() => Int, { nullable: true })
  xl: number;

  @Field(() => Int, { nullable: true })
  xxl: number;
}

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
