import { AuthChecker } from 'type-graphql';
import { Context } from '../types/context.types';
import { User, UserRole } from '../entity/User';

export const customAuthChecker: AuthChecker<Context, UserRole> = async (
  { context: { userId } },
  roles
) => {
  const user = await User.findById(userId);
  if (!user) return false;
  if (roles.includes(user.role)) {
    return true;
  }
  return false;
};
