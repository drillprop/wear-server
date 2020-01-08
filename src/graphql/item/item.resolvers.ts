import { Resolvers } from '../../generated/types';
import { Item } from '../../entity/Item';
import { User } from '../../entity/User';

const itemResolvers: Resolvers = {
  Mutation: {
    async createItem(_, { input }, { userId }) {
      try {
        const user = await User.findById(userId);
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
    },
    async deleteItem(_, { id }, { userId }) {
      const user = await User.findById(userId);

      if (!user) {
        throw Error('You must be logged in');
      }
      if (user.role === 'CUSTOMER') {
        throw Error(`You don't have permission to delete an item`);
      }

      await Item.delete(id);

      return {
        message: 'Successfully deleted item'
      };
    }
  },
  Query: {
    async items(_, args) {
      try {
        const { input } = args;
        if (input) {
          const search = await Item.searchItems(input);
          return search;
        }
        const items = await Item.find();
        return items;
      } catch (error) {
        throw Error(error);
      }
    }
  }
};

export default itemResolvers;
