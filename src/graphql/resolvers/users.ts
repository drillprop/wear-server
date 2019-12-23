import { User } from '../../entity/User';
import { MutationCreateUserArgs } from '../../generated/types';

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
        const user = new User();
        user.email = email;
        user.password = password;
        user.userName = userName;
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
