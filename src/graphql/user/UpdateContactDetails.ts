import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import ContactDetailsInput from './updateContactDetails/ContactDetailsInput';

@Resolver()
export default class UpdateContactDetailsResolver {
  @Authorized(['ADMIN', 'EMPLOYEE', 'CUSTOMER'])
  @Mutation(() => User)
  async updateContactDetails(
    @Arg('input') input: ContactDetailsInput,
    @Ctx() { userId }: Context
  ) {
    const userRepository = User.getRepository();
    try {
      const user = await User.findOne({ id: userId });
      const updatedUser = await userRepository.save({ ...user, ...input });
      return updatedUser;
    } catch (error) {
      throw Error(error);
    }
  }
}
