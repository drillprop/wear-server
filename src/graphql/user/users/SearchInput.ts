import { Field, InputType } from 'type-graphql';
import { UserRole } from '../../../entity/User';
import SearchInput from '../../shared/SearchInput';

@InputType()
export class SearchUserInput extends SearchInput {
  @Field(() => UserRole, { nullable: true })
  role: UserRole;
}
