import { Ctx, Mutation, Resolver, Arg } from 'type-graphql';
import { Context } from '../../types/context.types';
import { SuccessMessage } from '../shared/SuccessMessage';
import { User } from '../../entity/User';
import { Address } from '../../entity/Address';
import UpdateAddressInput from './updateAddress/UpdateAddressInput';

@Resolver()
export default class UpdateAddress {
  @Mutation(() => SuccessMessage)
  async updateAddress(
    @Arg('input') input: UpdateAddressInput,
    @Ctx() { userId }: Context
  ) {
    const user = await User.findOne({ id: userId });
    if (!user) throw Error('You must be logged in');
    const address = await Address.create({ ...input }).save();
    user.address = Promise.resolve(address);
    await user.save();
    return {
      message: 'Successfully updated address'
    };
  }
}
