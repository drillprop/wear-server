import bcrypt from 'bcrypt';
import { User, SignInput, UserRole } from '../../entity/User';
import { createUserToken, checkPassword } from '../../utils/helpers';
import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { Context } from '../../types/context.types';
import SuccessMessage from '../sharedTypeDefs';

@Resolver()
export default class UserResolver {
  @Query(() => [User], { nullable: 'items' })
  async users(@Ctx() { userId }: Context) {
    try {
      const user = await User.findById(userId);
      if (user?.role === 'ADMIN') {
        const allUsers = await User.find();
        return allUsers;
      } else {
        throw Error('You dont have permission to access list of users');
      }
    } catch (error) {
      throw Error(error);
    }
  }
  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: Context) {
    const user = await User.findById(userId);
    if (user) {
      return user;
    }
    return null;
  }
  @Mutation(() => User)
  async register(
    @Arg('input') { email, password }: SignInput,
    @Ctx() { res }: Context
  ) {
    try {
      const hashPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        email,
        password: hashPassword
      });
      await user.save();
      const token = createUserToken(user);
      res.cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      });
      return user;
    } catch (error) {
      throw Error(error);
    }
  }
  @Mutation(() => User)
  async login(
    @Arg('input') { email, password }: SignInput,
    @Ctx() { res }: Context
  ) {
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        throw Error('No user with this email');
      }
      const match = await checkPassword(password, user.password);
      if (!match) throw Error('Wrong Password');
      const token = createUserToken(user);
      res.cookie('token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
      });
      return user;
    } catch (error) {
      throw Error(error);
    }
  }
  @Mutation(() => SuccessMessage)
  signout(@Ctx() { res }: Context) {
    res.clearCookie('token');
    return { message: 'Successfully sign out' };
  }
  async changeUserRole(
    @Arg('email') email: string,
    @Arg('role') role: UserRole,
    @Ctx() { userId }: Context
  ) {
    try {
      const userAdmin = await User.findById(userId);
      if (userAdmin?.role === 'ADMIN') {
        const user = await User.findByEmail(email);
        if (user) {
          user.role = role;
          await user.save();
        } else {
          throw Error('No user with this email');
        }
      } else {
        throw Error('You dont have permission to access list of users');
      }
      return {
        message: `Succesfully set ${role} permission to ${email}`
      };
    } catch (error) {
      throw Error(error);
    }
  }
  @Mutation(() => SuccessMessage)
  async deleteAccount(
    @Arg('password') password: string,
    @Ctx() { userId, res }: Context
  ) {
    const user = await User.findById(userId);
    if (!user) {
      throw Error('You must be logged in');
    }
    const match = await checkPassword(password, user.password);
    if (!match) {
      throw Error('Wrong Password');
    }
    await User.delete(userId);
    res.clearCookie('token');
    return {
      message: 'Successfully deleted account'
    };
  }
}

// const userResolvers: Resolvers = {
//   Query: {
//     async users(_, __, { userId }) {
//       try {
//         const user = await User.findById(userId);
//         if (user?.role === 'ADMIN') {
//           const allUsers = await User.find();
//           return allUsers;
//         } else {
//           throw Error('You dont have permission to access list of users');
//         }
//       } catch (error) {
//         throw Error(error);
//       }
//     },
//     async me(_, __, { userId }) {
//       const user = await User.findById(userId);
//       if (user) {
//         return user;
//       }
//       return null;
//     }
//   },
//   Mutation: {
//     async register(_, args, { res }) {
//       const { email, password } = args.input;
//       try {
//         const hashPassword = await bcrypt.hash(password, 12);
//         const user = User.create({
//           email,
//           password: hashPassword
//         });
//         await user.save();
//         const token = createUserToken(user);
//         res.cookie('token', token, {
//           maxAge: 1000 * 60 * 60 * 24 * 7,
//           httpOnly: true
//         });
//         return user;
//       } catch (error) {
//         throw Error(error);
//       }
//     },
//     async login(_, args, { res }) {
//       const { email, password } = args.input;
//       try {
//         const user = await User.findByEmail(email);
//         if (!user) {
//           throw Error('No user with this email');
//         }

//         const match = await checkPassword(password, user.password);
//         if (!match) throw Error('Wrong Password');

//         const token = createUserToken(user);
//         res.cookie('token', token, {
//           maxAge: 1000 * 60 * 60 * 24 * 7,
//           httpOnly: true
//         });
//         return user;
//       } catch (error) {
//         throw Error(error);
//       }
//     },
//     signout(_, __, { res }) {
//       res.clearCookie('token');
//       return { message: 'Successfully sign out' };
//     },
//     async changeUserRole(_, { email, role }, { userId }) {
//       try {
//         const userAdmin = await User.findById(userId);
//         if (userAdmin?.role === 'ADMIN') {
//           const user = await User.findByEmail(email);
//           if (user) {
//             user.role = role;
//             await user.save();
//           } else {
//             throw Error('No user with this email');
//           }
//         } else {
//           throw Error('You dont have permission to access list of users');
//         }
//         return {
//           message: `Succesfully set ${role} permission to ${email}`
//         };
//       } catch (error) {
//         throw Error(error);
//       }
//     },
//     async deleteAccount(_, { password }, { userId, res }) {
//       const user = await User.findById(userId);
//       if (!user) {
//         throw Error('You must be logged in');
//       }

//       const match = await checkPassword(password, user.password);
//       if (!match) {
//         throw Error('Wrong Password');
//       }

//       await User.delete(userId);
//       res.clearCookie('token');

//       return {
//         message: 'Successfully deleted account'
//       };
//     }
//   }
// };

// export default userResolvers;
