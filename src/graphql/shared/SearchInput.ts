import { InputType, Field, Int, ID, registerEnumType } from 'type-graphql';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

registerEnumType(SortOrder, {
  name: 'SortOrder'
});

@InputType()
export default class SearchInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => Int, { defaultValue: 5 })
  take: number;

  @Field(() => Int, { defaultValue: 0 })
  skip: number;

  @Field({ nullable: true })
  sortBy: string;

  @Field(type => SortOrder, { defaultValue: SortOrder.DESC })
  sortOrder: SortOrder;
}
