import { UserDB } from '../../entity/User';
import { Resolvers } from '../../generated/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserToken = (user: UserDB) => {
  const { password, ...rest } = user;
  return jwt.sign({ ...rest }, 'somesecretkey', {
    expiresIn: '7d'
  });
};

const userResolvers: Resolvers = {
  Query: {
    async users() {
      const allUsers = await UserDB.find();
      return allUsers;
    }
  },
  Mutation: {
    async register(_, args) {
      const { email, password, userName } = args.input;
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new UserDB();
        user.email = email;
        user.userName = userName;
        user.password = hashPassword;
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
