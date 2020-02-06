import { Field, InputType } from 'type-graphql';
import SearchInput from '../../shared/SearchInput';
import { Gender, Category } from '../../../entity/Item';

@InputType()
export class SearchItemInput extends SearchInput {
  @Field({ nullable: true })
  priceFrom: number;

  @Field({ nullable: true })
  priceTo: number;

  @Field({ nullable: true })
  whereName: string;

  @Field(() => Category, { nullable: true })
  whereCategory: Category;

  @Field(() => Gender, { nullable: true })
  whereGender: Gender;
}
