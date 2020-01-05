import bcrypt from 'bcrypt';
import { User } from '../../entity/User';
import { Resolvers } from '../../generated/types';
import { createUserToken } from '../../utils/helpers';

const userResolvers: Resolvers = {
  Query: {
    async users(_, __, { id }) {
      try {
        const user = await User.findById(id);
        if (user?.role === 'ADMIN') {
          const allUsers = await User.find();
          return allUsers;
        } else {
          throw new Error('You dont have permission to access list of users');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async me(_, __, { id }) {
      const user = await User.findById(id);
      if (user) {
        return user;
      }
      return null;
    }
  },
  Mutation: {
    async register(_, args, { res }) {
      const { email, password } = args.input;
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User();
        user.email = email;
        user.password = hashPassword;
        await user.save();
        const token = createUserToken(user);
        res.cookie('token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true
        });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    async login(_, args, { res }) {
      const { email, password } = args.input;
      try {
        const user = await User.findByEmail(email);
        if (!user) {
          throw new Error('No user with this email');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          throw new Error('Wrong password');
        }
        await user.save();
        const token = createUserToken(user);
        res.cookie('token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true
        });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    signout(_, __, { res }) {
      res.clearCookie('token');
      return { message: 'Successfully sign out' };
    },
    async changeUserRole(_, { email, role }, { id }) {
      try {
        const userAdmin = await User.findById(id);
        if (userAdmin?.role === 'ADMIN') {
          const user = await User.findByEmail(email);
          if (user) {
            user.role = role;
            await user.save();
          } else {
            throw new Error('No user with this email');
          }
        } else {
          throw new Error('You dont have permission to access list of users');
        }
        return {
          message: `Succesfully set ${role} permission to ${email}`
        };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

export default userResolvers;
