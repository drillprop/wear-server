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
  name: string;

  @Field(() => Category, { nullable: true })
  category: Category;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field({ defaultValue: true })
  available: boolean;
}
