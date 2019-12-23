import { User } from '../../entity/User';

export default {
  Query: {
    async users() {
      const allUsers = await User.find();
      return allUsers;
    }
  }
};
