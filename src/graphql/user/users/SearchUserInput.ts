import { Field, InputType } from 'type-graphql';
import { UserRole } from '../../../entity/User';
import SearchInput from '../../shared/SearchInput';
import { IsEnum } from 'class-validator';

@InputType()
export class SearchUserInput extends SearchInput {
  @Field(() => UserRole, { nullable: true })
  @IsEnum(UserRole)
  role: UserRole;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
}
