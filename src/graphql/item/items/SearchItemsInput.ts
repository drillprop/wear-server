import { Field, InputType } from 'type-graphql';
import SearchInput from '../../shared/SearchInput';

@InputType()
export class SearchItemInput extends SearchInput {
  @Field({ nullable: true })
  priceFrom: number;
  @Field({ nullable: true })
  priceTo: number;
  @Field({ nullable: true })
  whereName: string;
  @Field({ nullable: true })
  whereCategory: string;
}
