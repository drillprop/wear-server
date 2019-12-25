import { User } from '../../entity/User';
import { MutationCreateUserArgs } from '../../generated/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserToken = (user: User) => {
  const { password, ...rest } = user;
  return jwt.sign({ ...rest }, 'somesecretkey', {
    expiresIn: '7d'
  });
};

export default {
  Query: {
    async users() {
      const allUsers = await User.find();
      return allUsers;
    }
  },
  Mutation: {
    async createUser(_: any, args: MutationCreateUserArgs) {
      const { email, password, userName } = args.input;
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User();
        user.email = email;
        user.userName = userName;
        user.password = hashPassword;
        await user.save();
        const token = createUserToken(user);
        return { ...user, token };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
