import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import ContactDetailsInput from './updateContactDetails/ContactDetailsInput';
import { SuccessMessage } from '../shared/SuccessMessage';

@Resolver()
export default class UpdateContactDetailsResolver {
  @Authorized(['ADMIN', 'EMPLOYEE', 'CUSTOMER'])
  @Mutation(() => SuccessMessage)
  async updateContactDetails(
    @Arg('input') input: ContactDetailsInput,
    @Ctx() { userId }: Context
  ) {
    const userRepository = User.getRepository();
    try {
      const user = await User.findOne({ id: userId });
      await userRepository.save({ ...user, ...input });
      return {
        message: 'Succesfully updated contact details'
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
