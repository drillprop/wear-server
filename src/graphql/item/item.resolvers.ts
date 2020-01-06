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
        const item = new Item();
        item.imageUrl = imageUrl;
        item.name = name;
        item.price = price;
        item.category = category;
        item.user = user;
        await item.save();
        return item;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

export default itemResolvers;
