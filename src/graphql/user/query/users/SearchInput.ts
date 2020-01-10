import { Field, InputType } from 'type-graphql';
import { SearchInput } from '../../../shared/sharedTypeDefs';
import { UserRole } from '../../../../entity/User';

@InputType()
export class SearchUserInput extends SearchInput {
  @Field(() => UserRole, { nullable: true })
  role: UserRole;
}
