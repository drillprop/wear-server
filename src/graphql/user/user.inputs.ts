import { InputType, Field } from 'type-graphql';
import { SearchInput } from '../sharedTypeDefs';
import { UserRole } from '../../entity/User';

@InputType()
export class SignInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class SearchUserInput extends SearchInput {
  @Field(() => UserRole, { nullable: true })
  role: UserRole;
}
