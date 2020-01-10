import { AuthChecker } from 'type-graphql';
import { User, UserRole } from '../entity/User';
import { Context } from '../types/context.types';

export const customAuthChecker: AuthChecker<Context, UserRole> = async (
  { context: { userId } },
  roles
) => {
  const user = await User.findOne({ id: userId });
  if (!user) return false;
  if (roles.includes(user.role)) {
    return true;
  }
  return false;
};
