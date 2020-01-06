import { Resolvers } from '../../generated/types';
import { Item } from '../../entity/Item';

const itemResolvers: Resolvers = {
  Mutation: {
    async createItem(_, { input }) {
      const { name, imageUrl, price, category } = input;
      const item = new Item();
      item.imageUrl = imageUrl;
      item.name = name;
      item.price = price;
      item.category = category;
      await item.save();
      return item;
    }
  }
};

export default itemResolvers;
