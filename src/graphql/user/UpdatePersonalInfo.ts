import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/context.types';
import { SuccessMessage } from '../shared/SuccessMessage';
import PersonalInfoInput from './updateContactDetails/PersonalInfoInput';

@Resolver()
export default class UpdatePersonalInfoResolver {
  @Authorized(['ADMIN', 'EMPLOYEE', 'CUSTOMER'])
  @Mutation(() => SuccessMessage)
  async updatePersonalInfo(
    @Arg('input') input: PersonalInfoInput,
    @Ctx() { userId }: Context
  ) {
    const userRepository = User.getRepository();
    try {
      const user = await User.findOne({ id: userId });
      await userRepository.save({ ...user, ...input });
      return {
        message: 'Succesfully updated personal information'
      };
    } catch (error) {
      throw Error(error);
    }
  }
}
