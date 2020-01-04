import bcrypt from 'bcrypt';
import { User } from '../../entity/User';
import { Resolvers } from '../../generated/types';
import { createUserToken } from '../../utils/helpers';

const userResolvers: Resolvers = {
  Query: {
    async users() {
      const allUsers = await User.find();
      return allUsers;
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
        const token = createUserToken(user);
        user.token = token;
        await user.save();
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
          throw new Error('No user with these email');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          throw new Error('Wrong password');
        }
        const token = createUserToken(user);
        user.token = token;
        await user.save();
        res.cookie('token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true
        });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

export default userResolvers;
