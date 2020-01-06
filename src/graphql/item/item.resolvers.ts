import { Resolvers } from '../../generated/types';
import { Item } from '../../entity/Item';
import { User } from '../../entity/User';

const itemResolvers: Resolvers = {
  Mutation: {
    async createItem(_, { input }, { id }) {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw Error('You need to login to add create item');
        }
        const { name, imageUrl, price, category } = input;
        const item = Item.create({ imageUrl, name, price, category, user });
        await item.save();
        return item;
      } catch (error) {
        throw Error(error);
      }
    }
  }
};

export default itemResolvers;
