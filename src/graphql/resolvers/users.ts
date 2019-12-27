import { UserDB } from '../../entity/User';
import { Resolvers } from '../../generated/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserToken = (user: UserDB) => {
  const { password, ...rest } = user;
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ ...rest }, secret, {
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
    },
    async login(_, args) {
      const { email, password } = args.input;
      try {
        const user = await UserDB.findByEmail(email);
        if (!user) {
          throw new Error('No user with these email');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          throw new Error('Wrong password');
        }
        const token = createUserToken(user);
        user.token = token;
        user.save();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

export default userResolvers;
