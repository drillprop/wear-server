import { Resolvers } from '../../generated/types';
import { Item } from '../../entity/Item';
import { User } from '../../entity/User';

const itemResolvers: Resolvers = {
  Mutation: {
    async createItem(_, { input }, { id }) {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw Error('You have to login to add an item');
        }
        if (user.role === 'CUSTOMER') {
          throw Error(`You don't have permission to create an item`);
        }
        const { name, imageUrl, price, category } = input;
        const item = Item.create({ imageUrl, name, price, category, user });
        await item.save();
        return item;
      } catch (error) {
        throw Error(error);
      }
    }
  },
  Query: {
    async items() {
      try {
        const items = await Item.find();
        return items;
      } catch (error) {
        throw Error(error);
      }
    }
  }
};

export default itemResolvers;
