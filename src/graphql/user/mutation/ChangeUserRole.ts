import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { User, UserRole } from '../../../entity/User';
import { SuccessMessage } from '../../shared/sharedTypeDefs';

@Resolver()
export default class ChangeUserRoleResolver {
  @Authorized('ADMIN')
  @Mutation(() => SuccessMessage)
  async changeUserRole(
    @Arg('email') email: string,
    @Arg('role', () => UserRole) role: UserRole
  ) {
    try {
      const user = await User.findAndSelectPassword('email', email);
      if (!user) throw Error('No user with this email');

      user.role = role;
      await user.save();

      return {
        message: `Succesfully set ${role} permission to ${email}`
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
