import { Resolvers } from '../../generated/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../entity/User';

const createUserToken = (user: User) => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '7d'
  });
};

const userResolvers: Resolvers = {
  Query: {
    async users() {
      const allUsers = await User.find();
      return allUsers;
    }
  },
  Mutation: {
    async register(_, args) {
      const { email, password } = args.input;
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User();
        user.email = email;
        user.password = hashPassword;
        const token = createUserToken(user);
        user.token = token;
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    async login(_, args) {
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
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

export default userResolvers;
