import { Field, InputType } from 'type-graphql';
import { UserRole } from '../../../entity/User';
import SearchInput from '../../shared/SearchInput';
import { IsEnum } from 'class-validator';

@InputType()
export class SearchUserInput extends SearchInput {
  @Field(() => UserRole, { nullable: true })
  @IsEnum(UserRole)
  whereRole: UserRole;
  @Field({ nullable: true })
  whereEmail: string;
  @Field({ nullable: true })
  whereFirstName: string;
  @Field({ nullable: true })
  whereLastName: string;
}
