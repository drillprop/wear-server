import { User } from '../../entity/User';
import { MutationCreateUserArgs } from '../../generated/types';
import bcrypt from 'bcrypt';

export default {
  Query: {
    async users() {
      const allUsers = await User.find();
      return allUsers;
    }
  },
  Mutation: {
    async createUser(_: any, args: MutationCreateUserArgs) {
      const { email, password, userName } = args;
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User();
        user.email = email;
        user.userName = userName;
        user.password = hashPassword;
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
